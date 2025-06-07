package br.com.pucminas.auth_service.models.dtos;

public record UserUpdateDTO(String name, String email, String phone, String photo) {
}
