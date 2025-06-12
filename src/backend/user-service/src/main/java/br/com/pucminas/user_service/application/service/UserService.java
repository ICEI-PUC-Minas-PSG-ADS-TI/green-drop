package br.com.pucminas.user_service.application.service;

import br.com.pucminas.user_service.application.client.AuthClient;
import br.com.pucminas.user_service.application.client.ImageClient;
import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;
import br.com.pucminas.user_service.application.dto.UserUpdateDTO;
import br.com.pucminas.user_service.domain.exception.ApiException;
import br.com.pucminas.user_service.domain.exception.ImageDeletionException;
import br.com.pucminas.user_service.domain.exception.PhotoUploadException;
import br.com.pucminas.user_service.domain.exception.UserNotFoundException;
import br.com.pucminas.user_service.domain.models.User;
import br.com.pucminas.user_service.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestClientException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ImageClient imageClient;
    private final PasswordEncoder passwordEncoder;
    private final AuthClient authClient;

    @Transactional(rollbackFor = Exception.class)
    public URI create(UserRequestDTO dto, MultipartFile photo) {
        log.info("create - iniciando criação de usuário [email={}, phone={}]", dto.email(), dto.phone());
        String firebaseUid = null;
        String photoUrl = null;

        try {
            log.debug("createAuthUser - solicitando criação no Firebase para email={}", dto.email());
            firebaseUid = createAuthUser(dto);
            log.debug("createAuthUser - criado com uid={}", firebaseUid);

            log.debug("uploadPhoto - iniciando upload de foto para email={}", dto.email());
            photoUrl = uploadPhoto(photo);
            String imageId = extractImageId(photoUrl);
            log.debug("uploadPhoto - concluído upload, photoUrl={} (imageId={})", photoUrl, imageId);

            User user = new User();
            user.setName(dto.name());
            user.setEmail(dto.email());
            user.setPasswordHash(passwordEncoder.encode(dto.password()));
            user.setPhone(dto.phone());
            user.setRole("USER");
            user.setCreatedAt(LocalDateTime.now());
            user.setPhotoUrl(photoUrl);
            user.setFirebaseUid(firebaseUid);

            log.debug("create - salvando usuário no banco [email={}, uid={}]", dto.email(), firebaseUid);
            User saved = userRepository.save(user);
            log.info("create - usuário criado com sucesso [id={}, uid={}]", saved.getId(), firebaseUid);
            return URI.create("/v1/users/" + saved.getId());

        } catch (Exception ex) {
            log.error("create - erro durante criação de usuário, iniciando rollback [firebaseUid={}, photoUrl={}]", firebaseUid, photoUrl, ex);
            if (firebaseUid != null) {
                try {
                    deleteAuthUser(firebaseUid);
                    log.debug("create - cleanup: usuário Firebase {} deletado", firebaseUid);
                } catch (Exception e) {
                    log.error("create - cleanup falhou ao deletar usuário Firebase {}", firebaseUid, e);
                }
            }
            if (photoUrl != null) {
                try {
                    String imageId = extractImageId(photoUrl);
                    imageClient.delete(imageId);
                    log.debug("create - cleanup: imagem {} deletada", imageId);
                } catch (Exception e) {
                    log.error("create - cleanup falhou ao remover foto do storage {}", photoUrl, e);
                }
            }
            throw ex;
        }
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> list() {
        log.info("list - buscando todos os usuários");
        List<UserResponseDTO> lista = userRepository.findAll().stream()
                .map(u -> new UserResponseDTO(u.getName(), u.getEmail(), u.getPhone(), u.getPhotoUrl()))
                .collect(Collectors.toList());
        log.debug("list - retornando {} usuários", lista.size());
        return lista;
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getById(Long id) {
        log.info("getById - buscando usuário id={}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("getById - usuário não encontrado id={}", id);
                    return new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id);
                });
        log.info("getById - usuário encontrado [id={}, email={}]", id, user.getEmail());
        return new UserResponseDTO(user.getName(), user.getEmail(), user.getPhone(), user.getPhotoUrl());
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> search(String email, String phone) {
        log.info("search - iniciando busca [emailContains={}, phoneContains={}]", email, phone);
        List<User> users;
        if (email != null && phone != null) {
            users = userRepository.findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(email, phone);
        } else if (email != null) {
            users = userRepository.findByEmailContainingIgnoreCase(email);
        } else if (phone != null) {
            users = userRepository.findByPhoneContainingIgnoreCase(phone);
        } else {
            users = userRepository.findAll();
        }
        log.debug("search - encontrados {} usuários", users.size());
        return users.stream()
                .map(u -> new UserResponseDTO(u.getName(), u.getEmail(), u.getPhone(), u.getPhotoUrl()))
                .collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(Long id, UserUpdateDTO dto, MultipartFile newPhoto) {
        log.info("update (partial) - iniciando atualização de usuário [id={}]", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado para id: " + id));
        UserUpdateDTO oldDto = new UserUpdateDTO(
                user.getName(), user.getEmail(), user.getPhone(), user.getPasswordHash()
        );
        String oldPhotoUrl = user.getPhotoUrl();
        String newPhotoUrl = oldPhotoUrl;

        try {
            if (!dto.isEmpty()) {
                log.debug("update - atualizando auth (Firebase) uid={}", user.getFirebaseUid());
                updateAuthUser(user.getFirebaseUid(), dto);
            }
            if (newPhoto != null && !newPhoto.isEmpty()) {
                newPhotoUrl = uploadPhoto(newPhoto);
                String oldImageId = extractImageId(oldPhotoUrl);
                imageClient.delete(oldImageId);
                log.debug("update - substituiu foto: deleted [oldImageId={}, newUrl={}]", oldImageId, newPhotoUrl);
            }
            if (dto.name() != null)     user.setName(dto.name());
            if (dto.email() != null)    user.setEmail(dto.email());
            if (dto.phone() != null)    user.setPhone(dto.phone());
            if (dto.password() != null) user.setPasswordHash(passwordEncoder.encode(dto.password()));
            if (!newPhotoUrl.equals(oldPhotoUrl)) {
                user.setPhotoUrl(newPhotoUrl);
            }

            userRepository.save(user);
            log.info("update - usuário id={} atualizado com sucesso em todos os sistemas", id);

        } catch (Exception ex) {
            log.error("update - falha, iniciando compensação", ex);

            try {
                updateAuthUser(user.getFirebaseUid(), oldDto);
            } catch (Exception compEx) {
                log.error("update - falha na compensação do Firebase [uid={}]", user.getFirebaseUid(), compEx);
            }
            if (newPhoto != null && !newPhoto.isEmpty() && newPhotoUrl != null) {
                try {
                    String newImageId = extractImageId(newPhotoUrl);
                    imageClient.delete(newImageId);
                } catch (Exception imgEx) {
                    log.error("update - falha ao deletar nova foto na compensação", imgEx);
                }
            }
            throw new ApiException(
                    "Falha ao atualizar usuário em todos os sistemas",
                    HttpStatus.INTERNAL_SERVER_ERROR, ex
            );
        }
    }

    @Transactional
    public void delete(Long id) {
        log.info("delete - iniciando remoção de usuário id={}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("delete - usuário não encontrado id={}", id);
                    return new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id);
                });

        String imageId = extractImageId(user.getPhotoUrl());
        log.debug("delete - imageId={} para remoção e firebaseUid={}", imageId, user.getFirebaseUid());
        try {
            imageClient.delete(imageId);
            authClient.deleteFirebaseUser(user.getFirebaseUid());
            log.debug("delete - recursos externos removidos para usuário id={}", id);
        } catch (RestClientException e) {
            log.error("delete - falha ao remover foto ou usuário Firebase para id={}", id, e);
            throw new ImageDeletionException("FALHA AO DELETAR FOTO DO USUÁRIO ID ::: " + id, e);
        }
        userRepository.deleteById(id);
        log.info("delete - usuário id={} deletado com sucesso", id);
    }

    String uploadPhoto(MultipartFile photo) {
        log.debug("uploadPhoto - iniciando upload de foto (tamanho={} bytes)", photo.getSize());
        try {
            String url = imageClient.upload(photo);
            log.debug("uploadPhoto - upload concluído, url={}", url);
            return url;
        } catch (IOException | RestClientException e) {
            log.error("uploadPhoto - erro ao enviar foto", e);
            throw new PhotoUploadException("FALHA AO ENVIAR FOTO DO USUÁRIO ::: ", e);
        }
    }

    String createAuthUser(UserRequestDTO dto) {
        log.debug("createAuthUser - criando usuário no Firebase [email={}]", dto.email());
        try {
            String uid = authClient.createFirebaseUser(dto);
            log.debug("createAuthUser - Firebase retornou uid={}", uid);
            return uid;
        } catch (RestClientException e) {
            log.error("createAuthUser - erro ao criar usuário no Firebase [email={}]", dto.email(), e);
            throw new ApiException("FALHA AO CRIAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void deleteAuthUser(String uid) {
        log.debug("deleteAuthUser - removendo usuário do Firebase uid={}", uid);
        try {
            authClient.deleteFirebaseUser(uid);
            log.debug("deleteAuthUser - usuário Firebase {} removido", uid);
        } catch (RestClientException e) {
            log.error("deleteAuthUser - falha ao remover usuário do Firebase uid={}", uid, e);
            throw new ApiException("FALHA AO DELETAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void updateAuthUser(String uid, UserUpdateDTO dto) {
        log.debug("uploadAuthUser - atualizando usuário Firebase uid={}", uid);
        try {
            authClient.updateFirebaseUser(uid, dto);
            log.debug("uploadAuthUser - Firebase atualizado uid={}", uid);
        } catch (RestClientException e) {
            log.error("uploadAuthUser - falha ao atualizar usuário no Firebase uid={}", uid, e);
            throw new ApiException("FALHA AO ATUALIZAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private String extractImageId(String photoUrl) {
        log.trace("extractImageId - photoUrl={}", photoUrl);
        if (photoUrl == null || photoUrl.isBlank()) {
            log.error("extractImageId - URL da foto inválida");
            throw new ApiException("URL DA FOTO INVÁLIDA PARA O USUÁRIO ::: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        String imageId = parts[parts.length - 1];
        log.trace("extractImageId - imageId={}", imageId);
        return imageId;
    }
}
