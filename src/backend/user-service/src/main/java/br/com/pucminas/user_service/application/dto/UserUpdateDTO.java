package br.com.pucminas.user_service.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserUpdateDTO(@JsonProperty("name") String name, @JsonProperty("email") String email, @JsonProperty("phone") String phone, @JsonProperty("password") String password) {
    public boolean isEmpty() {
        return name == null && email == null && phone == null && password == null;
    }
}
