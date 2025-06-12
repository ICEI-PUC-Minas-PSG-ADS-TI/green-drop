package br.com.pucminas.auth_service.application.dto;

public record UserRequestDTO(String name, String email, String password, String phone) {
}
