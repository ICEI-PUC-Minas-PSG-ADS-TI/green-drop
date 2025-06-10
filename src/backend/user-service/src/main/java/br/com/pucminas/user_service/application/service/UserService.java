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
import org.springframework.dao.DataIntegrityViolationException;
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
        String firebaseUid = null;
        String photoUrl = null;

        try {
            firebaseUid = createAuthUser(dto);

            photoUrl = extractImageId(uploadPhoto(photo));

            User user = new User();
            user.setName(dto.name());
            user.setEmail(dto.email());
            user.setPasswordHash(passwordEncoder.encode(dto.password()));
            user.setPhone(dto.phone());
            user.setRole("USER");
            user.setCreatedAt(LocalDateTime.now());
            user.setPhotoUrl(photoUrl);
            user.setFirebaseUid(firebaseUid);

            User saved = userRepository.save(user);
            return URI.create("/v1/users/" + saved.getId());

        } catch (Exception ex) {
            if (firebaseUid != null) {
                try {
                    deleteAuthUser(firebaseUid);
                } catch (Exception e) {
                    log.error("Falha ao deletar auth no Firebase", e);
                }
            }
            if (photoUrl != null) {
                try {
                    imageClient.delete(photoUrl);
                } catch (Exception e) {
                    log.error("Falha ao remover foto do storage", e);
                }
            }
            throw ex;
        }
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> list() {
        return userRepository.findAll().stream()
                .map(u -> new UserResponseDTO(
                        u.getName(),
                        u.getEmail(),
                        u.getPhone(),
                        u.getPhotoUrl()
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id));
        return new UserResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getPhotoUrl()
        );
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> search(String email, String phone) {
        List<User> users;
        if (email != null && phone != null) {
            users = userRepository.findByEmailContainingIgnoreCaseAndPhoneContainingIgnoreCase(email, phone);
        } else if (email != null) {
            users = userRepository.findByEmailContainingIgnoreCase(email);
        } else if (phone != null) {
            users = userRepository.findByPhoneContainingIgnoreCase(phone);
        } else {
            users = userRepository.findAll();
        }

        return users.stream()
                .map(u -> new UserResponseDTO(
                        u.getName(),
                        u.getEmail(),
                        u.getPhone(),
                        u.getPhotoUrl()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void update(Long id, UserRequestDTO dto) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id));
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPhone(dto.phone());
        user.setPasswordHash(passwordEncoder.encode(dto.password()));

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException("Falha ao atualizar usuário: dados duplicados ou inválidos", HttpStatus.CONFLICT, e);
        }
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("USUÁRIO NÃO ENCONTRADO PARA ID ::: " + id));
        String imageId = extractImageId(user.getPhotoUrl());
        try {
            imageClient.delete(imageId);
            authClient.deleteFirebaseUser(user.getFirebaseUid());
        } catch (RestClientException e) {
            throw new ImageDeletionException("FALHA AO DELETAR FOTO DO USUÁRIO ID ::: " + id, e);
        }
        userRepository.deleteById(id);
    }

    private String uploadPhoto(MultipartFile photo) {
        try {
            return imageClient.upload(photo);
        } catch (IOException | RestClientException e) {
            throw new PhotoUploadException("FALHA AO ENVIAR FOTO DO USUÁRIO ::: ", e);
        }
    }

    private String createAuthUser(UserRequestDTO dto) {
        try {
            return authClient.createFirebaseUser(dto);
        } catch (RestClientException e) {
            throw new ApiException("FALHA AO CRIAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void deleteAuthUser(String uid) {
        try {
            authClient.deleteFirebaseUser(uid);
        } catch (RestClientException e) {
            throw new ApiException("FALHA AO DELETAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void uploadAuthUser(String uid, UserUpdateDTO dto) {
        try {
            authClient.updateFirebaseUser(uid, dto);
        } catch (RestClientException e) {
            throw new ApiException("FALHA AO ATUALIZAR USUÁRIO NO FIREBASE ::: ", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    private String extractImageId(String photoUrl) {
        if (photoUrl == null || photoUrl.isBlank()) {
            throw new ApiException("URL DA FOTO INVÁLIDA PARA O USUÁRIO ::: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        return parts[parts.length - 1];
    }
}
