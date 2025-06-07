package br.com.pucminas.user_service.application.client;

import br.com.pucminas.user_service.config.FeignJsonConfig;
import br.com.pucminas.user_service.resource.dtos.UserRequestDTO;

import br.com.pucminas.user_service.resource.dtos.UserUpdateDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "auth-service",
        url  = "${auth.service.url:http://localhost:8080/v1/auth}",
        configuration = FeignJsonConfig.class
)
public interface AuthClient {
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    String createFirebaseUser(@RequestBody UserRequestDTO userRequest);

    @DeleteMapping
    void deleteFirebaseUser(@RequestParam String uid);

    @PutMapping
    void updateFirebaseUser(
            @RequestParam String uid,
            @RequestBody UserUpdateDTO userUpdateDTO);
}

