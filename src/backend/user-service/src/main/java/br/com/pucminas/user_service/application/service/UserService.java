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
import br.com.pucminas.user_service.domain.model.User;
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
    private final String tag = "ms.user.service.";

    @Transactional(rollbackFor = Exception.class)
    public URI create(UserRequestDTO dto, MultipartFile photo) {
        log.info("[{}create] - iniciando criação de usuário [email={}, phone={}]", tag, dto.email(), dto.phone());
        String firebaseUid = null;
        String photoUrl = null;
        User saved = null;

        try {
            User user = new User();
            user.setName(dto.name());
            user.setEmail(dto.email());
            user.setPasswordHash(passwordEncoder.encode(dto.password()));
            user.setPhone(dto.phone());
            user.setRole("USER");
            user.setCreatedAt(LocalDateTime.now());
            user.setPoints(0);

            saved = userRepository.save(user);
            log.debug("[{}create] - usuário salvo localmente [id={}]", tag, saved.getId());
            log.debug("[{}createAuthUser] - solicitando criação no Firebase [email={}, id={}]", tag, dto.email(), saved.getId());
            firebaseUid = createAuthUser(dto, saved.getId());
            log.debug("[{}createAuthUser] - usuário Firebase criado [uid={}]", tag, firebaseUid);
            log.debug("[{}uploadPhoto] - iniciando upload de foto [email={}]", tag, dto.email());
            photoUrl = uploadPhoto(photo);
            String imageId = extractImageId(photoUrl);
            log.debug("[{}uploadPhoto] - upload concluído [photoUrl={}, imageId={}]", tag, photoUrl, imageId);
            saved.setFirebaseUid(firebaseUid);
            saved.setPhotoUrl(photoUrl);
            userRepository.save(saved);

            log.info("[{}create] - usuário criado com sucesso [id={}, uid={}]", tag, saved.getId(), firebaseUid);
            return URI.create("/v1/users/" + saved.getId());

        } catch (Exception ex) {
            log.error("[{}create] - erro durante criação de usuário, iniciando rollback [firebaseUid={}, photoUrl={}]", tag, firebaseUid, photoUrl, ex);

            if (saved != null && saved.getId() != null) {
                userRepository.deleteById(saved.getId());
                log.debug("[{}create] - cleanup usuário local removido [id={}]", tag, saved.getId());
            }

            if (firebaseUid != null) {
                try {
                    deleteAuthUser(firebaseUid);
                    log.debug("[{}create] - cleanup Firebase user removido [uid={}]", tag, firebaseUid);
                } catch (Exception e) {
                    log.error("[{}create] - cleanup falhou ao remover usuário Firebase [uid={}]", tag, firebaseUid, e);
                }
            }
            if (photoUrl != null) {
                try {
                    String imageId = extractImageId(photoUrl);
                    imageClient.delete(imageId);
                    log.debug("[{}create] - cleanup imagem removida [imageId={}]", tag, imageId);
                } catch (Exception e) {
                    log.error("[{}create] - cleanup falhou ao remover foto do storage [photoUrl={}]", tag, photoUrl, e);
                }
            }
            throw ex;
        }
    }

    private String createAuthUser(UserRequestDTO dto, Long userId) {
        log.debug("[{}createAuthUser] - criando usuário no Firebase [email={}, idLocal={}]", tag, dto.email(), userId);
        try {
            String uid = authClient.createFirebaseUser(dto, userId);
            log.debug("[{}createAuthUser] - Firebase retornou uid={}]", tag, uid);
            return uid;
        } catch (RestClientException e) {
            log.error("[{}createAuthUser] - erro ao criar usuário no Firebase [email={}]", tag, dto.email(), e);
            throw new ApiException("FALHA AO CRIAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> list() {
        log.info("[{}list] - buscando todos os usuários", tag);
        List<UserResponseDTO> lista = userRepository.findAll().stream()
                .map(u -> new UserResponseDTO(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        u.getPhone(),
                        u.getPhotoUrl(),
                        u.getCreatedAt(),
                        u.getFirebaseUid(),
                        u.getPoints()))
                .collect(Collectors.toList());
        log.debug("[{}list] - usuários retornados [count={}]", tag, lista.size());
        return lista;
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getById(Long id) {
        log.info("[{}getById] - buscando usuário [id={}]", tag, id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("[{}getById] - usuário não encontrado [id={}]", tag, id);
                    return new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id);
                });
        log.info("[{}getById] - usuário encontrado [id={}, email={}]", tag, id, user.getEmail());
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getPhotoUrl(),
                user.getCreatedAt(),
                user.getFirebaseUid(),
                user.getPoints());
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> search(String email, String phone) {
        log.info("[{}search] - iniciando busca [emailContains={}, phoneContains={}]", tag, email, phone);
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
        log.debug("[{}search] - usuários encontrados [count={}]", tag, users.size());
        return users.stream()
                .map(u -> new UserResponseDTO(
                        u.getId(),
                        u.getName(),
                        u.getEmail(),
                        u.getPhone(),
                        u.getPhotoUrl(),
                        u.getCreatedAt(),
                        u.getFirebaseUid(),
                        u.getPoints()))
                .collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(Long id, UserUpdateDTO dto, MultipartFile newPhoto) {
        log.info("[{}update] - iniciando atualização de usuário [id={}]", tag, id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("[{}update] - usuário não encontrado [id={}]", tag, id);
                    return new UserNotFoundException("Usuário não encontrado para id: " + id);
                });

        UserUpdateDTO oldDto = new UserUpdateDTO(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getPasswordHash()
        );
        String oldPhotoUrl = user.getPhotoUrl();
        String newPhotoUrl = oldPhotoUrl;

        try {
            if (!dto.isEmpty()) {
                log.debug("[{}updateAuthUser] - atualizando Firebase user [uid={}]", tag, user.getFirebaseUid());
                updateAuthUser(user.getFirebaseUid(), dto);
                log.debug("[{}updateAuthUser] - Firebase user atualizado [uid={}]", tag, user.getFirebaseUid());
            }
            if (newPhoto != null && !newPhoto.isEmpty()) {
                log.debug("[{}uploadPhoto] - iniciando upload de nova foto [id={}]", tag, id);
                newPhotoUrl = uploadPhoto(newPhoto);
                String oldImageId = extractImageId(oldPhotoUrl);
                imageClient.delete(oldImageId);
                log.debug("[{}uploadPhoto] - foto substituída [oldImageId={}, newPhotoUrl={}]", tag, oldImageId, newPhotoUrl);
            }
            if (dto.name() != null)     user.setName(dto.name());
            if (dto.email() != null)    user.setEmail(dto.email());
            if (dto.phone() != null)    user.setPhone(dto.phone());
            if (dto.password() != null) user.setPasswordHash(passwordEncoder.encode(dto.password()));
            if (!newPhotoUrl.equals(oldPhotoUrl)) {
                user.setPhotoUrl(newPhotoUrl);
            }

            userRepository.save(user);
            log.info("[{}update] - usuário atualizado com sucesso [id={}]", tag, id);

        } catch (Exception ex) {
            log.error("[{}update] - erro na atualização, iniciando compensação [id={}]", tag, id, ex);

            try {
                updateAuthUser(user.getFirebaseUid(), oldDto);
                log.debug("[{}update] - compensação Firebase concluída [uid={}]", tag, user.getFirebaseUid());
            } catch (Exception compEx) {
                log.error("[{}update] - falha na compensação Firebase [uid={}]", tag, user.getFirebaseUid(), compEx);
            }
            if (newPhoto != null && !newPhoto.isEmpty() && newPhotoUrl != null) {
                try {
                    String newImageId = extractImageId(newPhotoUrl);
                    imageClient.delete(newImageId);
                    log.debug("[{}update] - compensação imagem removida [imageId={}]", tag, newImageId);
                } catch (Exception imgEx) {
                    log.error("[{}update] - falha na compensação de imagem [newPhotoUrl={}]", tag, newPhotoUrl, imgEx);
                }
            }
            throw new ApiException("Falha ao atualizar usuário em todos os sistemas", HttpStatus.INTERNAL_SERVER_ERROR, ex);
        }
    }

    @Transactional
    public void delete(Long id) {
        log.info("[{}delete] - iniciando remoção de usuário [id={}]", tag, id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("[{}delete] - usuário não encontrado [id={}]", tag, id);
                    return new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id);
                });

        String imageId = extractImageId(user.getPhotoUrl());
        log.debug("[{}delete] - recursos externos, imageId={}, firebaseUid={}", tag, imageId, user.getFirebaseUid());
        try {
            imageClient.delete(imageId);
            authClient.deleteFirebaseUser(user.getFirebaseUid());
            log.debug("[{}delete] - cleanup externo concluído [id={}]", tag, id);
        } catch (RestClientException e) {
            log.error("[{}delete] - falha ao remover recursos externos [id={}]", tag, id, e);
            throw new ImageDeletionException("FALHA AO DELETAR FOTO DO USUÁRIO ID ::: " + id, e);
        }
        userRepository.deleteById(id);
        log.info("[{}delete] - usuário removido com sucesso [id={}]", tag, id);
    }

    public void updatePoints(Long id, int delta) {
        log.info("[{}updatePoints] - ajustando pontos de usuário [id={}, delta={}]", tag, id, delta);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("[{}updatePoints] - usuário não encontrado [id={}]", tag, id);
                    return new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id);
                });
        user.setPoints(user.getPoints() + delta);
        userRepository.save(user);
        log.info("[{}updatePoints] - pontos atualizados [id={}, newPoints={}]", tag, id, user.getPoints());
    }

    private String uploadPhoto(MultipartFile photo) {
        log.debug("[{}uploadPhoto] - iniciando upload de foto [size={} bytes]", tag, photo.getSize());
        try {
            String url = imageClient.upload(photo);
            log.debug("[{}uploadPhoto] - upload concluído [url={}]", tag, url);
            return url;
        } catch (IOException | RestClientException e) {
            log.error("[{}uploadPhoto] - erro ao enviar foto", tag, e);
            throw new PhotoUploadException("FALHA AO ENVIAR FOTO DO USUÁRIO ::: ", e);
        }
    }

    private void deleteAuthUser(String uid) {
        log.debug("[{}deleteAuthUser] - removendo usuário do Firebase [uid={}]", tag, uid);
        try {
            authClient.deleteFirebaseUser(uid);
            log.debug("[{}deleteAuthUser] - usuário Firebase removido [uid={}]", tag, uid);
        } catch (RestClientException e) {
            log.error("[{}deleteAuthUser] - falha ao remover usuário do Firebase [uid={}]", tag, uid, e);
            throw new ApiException("FALHA AO DELETAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void updateAuthUser(String uid, UserUpdateDTO dto) {
        log.debug("[{}updateAuthUser] - atualizando usuário no Firebase [uid={}]", tag, uid);
        try {
            authClient.updateFirebaseUser(uid, dto);
            log.debug("[{}updateAuthUser] - Firebase atualizado [uid={}]", tag, uid);
        } catch (RestClientException e) {
            log.error("[{}updateAuthUser] - falha ao atualizar usuário no Firebase [uid={}]", tag, uid, e);
            throw new ApiException("FALHA AO ATUALIZAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private String extractImageId(String photoUrl) {
        log.trace("[{}extractImageId] - iniciando extração de imageId [photoUrl={}]", tag, photoUrl);
        if (photoUrl == null || photoUrl.isBlank()) {
            log.error("[{}extractImageId] - URL da foto inválida", tag);
            throw new ApiException("URL DA FOTO INVÁLIDA PARA O USUÁRIO ::: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        String imageId = parts[parts.length - 1];
        log.trace("[{}extractImageId] - imageId extraído [imageId={}]", tag, imageId);
        return imageId;
    }
}
