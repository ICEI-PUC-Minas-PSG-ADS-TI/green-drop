package br.com.pucminas.auth_service.models.dtos;

public record UserRequestDTO(String name, String email, String password, String phone) {
}
