package br.com.pucminas.auth_service.models.dtos;

public record LoginResponseDTO(String token, String refreshToken) {
}
