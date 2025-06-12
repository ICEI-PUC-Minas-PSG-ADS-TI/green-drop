package br.com.pucminas.auth_service.adapter.in.web;

import br.com.pucminas.auth_service.adapter.docs.AuthControllerDoc;
import br.com.pucminas.auth_service.application.dto.*;
import br.com.pucminas.auth_service.application.service.AuthService;

import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/auth")
public class AuthController implements AuthControllerDoc {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping
    public ResponseEntity<String> createFirebaseUser(UserRequestDTO userRequest) throws FirebaseAuthException {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.createFirebaseUser(userRequest));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFirebaseUser(String uid) {
        authService.deleteFirebaseUser(uid);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateFirebaseUser(String uid, UserUpdateDTO userUpdateDTO) {
        authService.updateFirebaseUser(uid, userUpdateDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout/{uid}")
    public ResponseEntity<Void> logout(String uid) {
        authService.logout(uid);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponseDTO> refreshToken(RefreshTokenRequestDTO refreshTokenRequest) {
        return ResponseEntity.ok().body(authService.refresh(refreshTokenRequest));
    }

    @PostMapping("/{codUsu}/reset-senha")
    public ResponseEntity<String> resetPassword(String codUsu) {
        return ResponseEntity.ok(authService.resetPassword(codUsu));
    }
}
