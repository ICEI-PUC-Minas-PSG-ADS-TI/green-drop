package br.com.pucminas.auth_service.adapter.docs;

import br.com.pucminas.auth_service.models.dtos.*;

import com.google.firebase.auth.FirebaseAuthException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "AUTENTICACAO", description = "Controller para autenticação e autorização de usuários")
public interface AuthControllerDoc {
    @Operation(summary = "Login")
    ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest);

    @Operation(summary = "Criar usuario Firebase")
    ResponseEntity<String> createFirebaseUser(@RequestBody UserRequestDTO userRequest) throws FirebaseAuthException;

    @Operation(summary = "Deleta usuario Firebase")
    ResponseEntity<Void> deleteFirebaseUser(@RequestParam String uid);

    @Operation(summary = "Atualiza usuario Firebase")
    ResponseEntity<Void> updateFirebaseUser(
            @RequestParam String uid,
            @RequestBody UserUpdateDTO userUpdateDTO);

    @Operation(summary = "Logout")
    ResponseEntity<Void> logout(@PathVariable("uid") String uid);

    @Operation(summary = "Renovar token JWT")
    ResponseEntity<LoginResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequest);

    @Operation(summary = "Resetar senha de um usuário.")
    ResponseEntity<String> resetPassword(@PathVariable("codUsu") String codUsu);
}