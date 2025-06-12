package br.com.pucminas.auth_service.application.service;

import br.com.pucminas.auth_service.application.dto.*;
import br.com.pucminas.auth_service.domain.exception.*;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    @Value("${firebase.config.auth-url}")
    private String firebaseAuthUrl;
    @Value("${firebase.config.api-key}")
    private String firebaseApiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public LoginResponseDTO login(LoginRequestDTO dto) {
        log.info("Iniciando login para email={}", dto.email());
        var payload = Map.<String,Object>of(
                "email", dto.email(),
                "password", dto.password(),
                "returnSecureToken", true
        );
        log.debug("Payload de login montado (senha não exibida)");
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(
                    firebaseAuthUrl + "?key=" + firebaseApiKey,
                    HttpMethod.POST,
                    req,
                    Map.class
            );
            log.debug("Resposta HTTP do Firebase Auth: status={}", resp.getStatusCode());
        } catch (RestClientException e) {
            log.error("Falha ao chamar Firebase Auth para email={}", dto.email(), e);
            throw new FirebaseLoginException("Falha ao chamar Firebase Auth", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null || !body.containsKey("idToken") || !body.containsKey("refreshToken")) {
            log.error("Resposta inválida do Firebase no login para email={}: {}", dto.email(), body);
            throw new FirebaseLoginException("Resposta inválida do Firebase no login: " + body);
        }

        log.info("Login bem-sucedido para email={}", dto.email());
        // não logamos os tokens completos por segurança
        return new LoginResponseDTO(
                (String) body.get("idToken"),
                (String) body.get("refreshToken")
        );
    }

    public LoginResponseDTO refresh(RefreshTokenRequestDTO refreshToken) {
        log.info("Iniciando refresh de token");
        String url = "https://securetoken.googleapis.com/v1/token?key=" + firebaseApiKey;
        var payload = Map.<String,Object>of(
                "grant_type", "refresh_token",
                "refresh_token", refreshToken.refreshToken()
        );
        log.debug("Payload de refresh montado (refreshToken não exibido)");
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(url, HttpMethod.POST, req, Map.class);
            log.debug("Resposta HTTP do Firebase Secure Token: status={}", resp.getStatusCode());
        } catch (RestClientException e) {
            log.error("Falha ao renovar token no Firebase", e);
            throw new FirebaseTokenRefreshException("Falha ao renovar token no Firebase", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null
                || !body.containsKey("id_token")
                || !body.containsKey("refresh_token")) {
            log.error("Resposta inválida do Firebase no refresh: {}", body);
            throw new FirebaseTokenRefreshException("Resposta inválida do Firebase no refresh: " + body);
        }

        log.info("Refresh de token bem-sucedido");
        return new LoginResponseDTO(
                (String) body.get("id_token"),
                (String) body.get("refresh_token")
        );
    }

    public void logout(String uid) {
        log.info("Revogando refresh tokens para uid={}", uid);
        try {
            FirebaseAuth.getInstance().revokeRefreshTokens(uid);
            log.info("Tokens revogados com sucesso para uid={}", uid);
        } catch (FirebaseAuthException e) {
            log.error("Erro ao revogar tokens do usuário uid={}", uid, e);
            throw new FirebaseLogoutException("Erro ao revogar tokens do usuário: " + uid, e);
        }
    }

    public String resetPassword(String uid) {
        log.info("Gerando link de reset de senha para uid={}", uid);
        try {
            var user = FirebaseAuth.getInstance().getUser(uid);
            String email = user.getEmail();
            String link = FirebaseAuth.getInstance().generatePasswordResetLink(email);
            log.info("Link de reset criado para uid={} (email={})", uid, email);
            return link;
        } catch (FirebaseAuthException e) {
            log.error("Erro ao gerar link de reset para uid={}", uid, e);
            throw new FirebasePasswordResetException("Erro ao gerar link de reset para o usuário: " + uid, e);
        }
    }

    public String createFirebaseUser(UserRequestDTO userRequestDTO) throws FirebaseAuthException {
        log.info("creat - Criando novo usuário Firebase: email={}, nome={}", userRequestDTO.email(), userRequestDTO.name());
        UserRecord user = FirebaseAuth.getInstance().createUser(new UserRecord.CreateRequest()
                .setDisplayName(userRequestDTO.name())
                .setEmail(userRequestDTO.email())
                .setPassword(userRequestDTO.password())
                .setPhoneNumber(userRequestDTO.phone()));
        log.info("Usuário criado com uid={}", user.getUid());
        setUserRole(user.getUid());
        return user.getUid();
    }

    private void setUserRole(String uid) {
        log.info("Definindo papel 'USER' para uid={}", uid);
        try {
            FirebaseAuth.getInstance().setCustomUserClaims(uid, Map.of("role", "USER"));
            log.info("Papel definido com sucesso para uid={}", uid);
        } catch (FirebaseAuthException e) {
            log.error("Erro ao definir papel para uid={}", uid, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "ERRO AO DEFINIR PAPEL DO USUARIO.", e);
        }
    }

    private HttpHeaders defaultHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        log.debug("Headers padrão para requisição criados");
        return headers;
    }

    public void deleteFirebaseUser(String uid) {
        log.info("Deletando usuário Firebase uid={}", uid);
        try {
            FirebaseAuth.getInstance().deleteUser(uid);
            log.info("Usuário deletado com sucesso uid={}", uid);
        } catch (FirebaseAuthException e) {
            log.error("Erro ao deletar usuário uid={}", uid, e);
            throw new RuntimeException("Erro ao deletar usuário no Firebase: " + uid, e);
        }
    }

    public void updateFirebaseUser(String uid, UserUpdateDTO userRequest) {
        log.info("Atualizando usuário Firebase uid={}", uid);
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);

        if (userRequest.name() != null) {
            updateRequest.setDisplayName(userRequest.name());
            log.debug("Novo displayName={}", userRequest.name());
        }
        if (userRequest.email() != null) {
            updateRequest.setEmail(userRequest.email());
            log.debug("Novo email={}", userRequest.email());
        }
        if (userRequest.phone() != null) {
            updateRequest.setPhoneNumber(userRequest.phone());
            log.debug("Novo phoneNumber={}", userRequest.phone());
        }
        if (userRequest.photo() != null) {
            updateRequest.setPhotoUrl(userRequest.photo());
            log.debug("Novo photoUrl={}", userRequest.photo());
        }

        try {
            FirebaseAuth.getInstance().updateUser(updateRequest);
            log.info("Usuário atualizado com sucesso uid={}", uid);
        } catch (FirebaseAuthException e) {
            log.error("Erro ao atualizar usuário uid={}", uid, e);
            throw new RuntimeException("Erro ao atualizar usuário no Firebase: " + uid, e);
        }
    }
}
