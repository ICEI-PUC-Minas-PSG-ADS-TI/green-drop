package br.com.pucminas.user_service.resource.dtos;

public record UserRequestDTO(String name, String email, String password, String phone) {
}
