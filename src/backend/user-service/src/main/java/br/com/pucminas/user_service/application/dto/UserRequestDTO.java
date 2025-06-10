package br.com.pucminas.user_service.application.dto;

public record UserRequestDTO(String name, String email, String password, String phone) {
}
