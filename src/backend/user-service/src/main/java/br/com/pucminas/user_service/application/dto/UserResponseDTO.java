package br.com.pucminas.user_service.application.dto;

import java.time.LocalDateTime;

public record UserResponseDTO(
        Long id,
        String name,
        String email,
        String phone,
        String photoUrl,
        LocalDateTime createdAt,
        String firebaseUid
) {
}
