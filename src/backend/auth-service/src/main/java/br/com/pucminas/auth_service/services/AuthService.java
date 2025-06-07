package br.com.pucminas.auth_service.services;

import br.com.pucminas.auth_service.exceptions.*;
import br.com.pucminas.auth_service.models.dtos.*;

import com.google.firebase.auth.FirebaseAuth;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${firebase.config.auth-url}")
    private String firebaseAuthUrl;
    @Value("${firebase.config.api-key}")
    private String firebaseApiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public LoginResponseDTO login(LoginRequestDTO dto) {
        var payload = Map.<String,Object>of(
                "email", dto.email(),
                "password", dto.password(),
                "returnSecureToken", true
        );
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(
                    firebaseAuthUrl + "?key=" + firebaseApiKey,
                    HttpMethod.POST,
                    req,
                    Map.class
            );
        } catch (RestClientException e) {
            throw new FirebaseLoginException("Falha ao chamar Firebase Auth", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null || !body.containsKey("idToken") || !body.containsKey("refreshToken")) {
            throw new FirebaseLoginException("Resposta inválida do Firebase no login: " + body);
        }

        return new LoginResponseDTO(
                (String) body.get("idToken"),
                (String) body.get("refreshToken")
        );
    }

    public LoginResponseDTO refresh(RefreshTokenRequestDTO refreshToken) {
        String url = "https://securetoken.googleapis.com/v1/token?key=" + firebaseApiKey;
        var payload = Map.<String,Object>of(
                "grant_type", "refresh_token",
                "refresh_token", refreshToken.refreshToken()
        );
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(url, HttpMethod.POST, req, Map.class);
        } catch (RestClientException e) {
            throw new FirebaseTokenRefreshException("Falha ao renovar token no Firebase", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null
                || !body.containsKey("id_token")
                || !body.containsKey("refresh_token")) {
            throw new FirebaseTokenRefreshException("Resposta inválida do Firebase no refresh: " + body);
        }

        return new LoginResponseDTO(
                (String) body.get("id_token"),
                (String) body.get("refresh_token")
        );
    }

    public void logout(String uid) {
        try {
            FirebaseAuth.getInstance().revokeRefreshTokens(uid);
        } catch (com.google.firebase.auth.FirebaseAuthException e) {
            throw new FirebaseLogoutException("Erro ao revogar tokens do usuário: " + uid, e);
        }
    }

    public String resetPassword(String uid) {
        try {
            var user = FirebaseAuth.getInstance().getUser(uid);
            return FirebaseAuth.getInstance().generatePasswordResetLink(user.getEmail());
        } catch (com.google.firebase.auth.FirebaseAuthException e) {
            throw new FirebasePasswordResetException("Erro ao gerar link de reset para o usuário: " + uid, e);
        }
    }

    public String createFirebaseUser(UserRequestDTO userRequestDTO) throws FirebaseAuthException {
        UserRecord user = FirebaseAuth.getInstance().createUser(new UserRecord.CreateRequest()
                .setDisplayName(userRequestDTO.name()).setEmail(userRequestDTO.email())
                .setPassword(userRequestDTO.password()).setPhoneNumber(userRequestDTO.phone()));
        setUserRole(user.getUid());
        return user.getUid();
    }

    private void setUserRole(String uid) {
        try {
            FirebaseAuth.getInstance().setCustomUserClaims(uid, Map.of("role", "USER"));
        } catch (FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "ERRO AO DEFINIR PAPEL DO USUARIO.", e);
        }
    }

    private HttpHeaders defaultHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    public void deleteFirebaseUser(String uid) {
        try {
            FirebaseAuth.getInstance().deleteUser(uid);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("Erro ao deletar usuário no Firebase: " + uid, e);
        }
    }

    public void updateFirebaseUser(String uid, UserUpdateDTO userRequest) {
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);

        if (userRequest.name() != null) {
            updateRequest.setDisplayName(userRequest.name());
        }
        if (userRequest.email() != null) {
            updateRequest.setEmail(userRequest.email());
        }
        if (userRequest.phone() != null) {
            updateRequest.setPhoneNumber(userRequest.phone());
        }
        if (userRequest.photo() != null) {
            updateRequest.setPhotoUrl(userRequest.photo());
        }

        try {
            FirebaseAuth.getInstance().updateUser(updateRequest);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("Erro ao atualizar usuário no Firebase: " + uid, e);
        }
    }
}
