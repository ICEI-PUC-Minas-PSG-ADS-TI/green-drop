package br.com.pucminas.auth_service.application.dto;

public record LoginResponseDTO(String token, String refreshToken) {
}
