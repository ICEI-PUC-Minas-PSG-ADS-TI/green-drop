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
    private final String tag = "ms.auth.service.";
    @Value("${firebase.config.auth-url}")
    private String firebaseAuthUrl;
    @Value("${firebase.config.api-key}")
    private String firebaseApiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public LoginResponseDTO login(LoginRequestDTO dto) {
        log.info("[{}login] - iniciando login [email={}]", tag, dto.email());
        var payload = Map.<String,Object>of(
                "email", dto.email(),
                "password", dto.password(),
                "returnSecureToken", true
        );
        log.debug("[{}login] - payload preparado (senha não exibida)", tag);
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(
                    firebaseAuthUrl + "?key=" + firebaseApiKey,
                    HttpMethod.POST,
                    req,
                    Map.class
            );
            log.debug("[{}login] - resposta HTTP Firebase Auth [status={}]", tag, resp.getStatusCode());
        } catch (RestClientException e) {
            log.error("[{}login] - falha ao chamar Firebase Auth [email={}]", tag, dto.email(), e);
            throw new FirebaseLoginException("Falha ao chamar Firebase Auth", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null || !body.containsKey("idToken") || !body.containsKey("refreshToken")) {
            log.error("[{}login] - resposta inválida do Firebase [email={}, body={}]", tag, dto.email(), body);
            throw new FirebaseLoginException("Resposta inválida do Firebase no login: " + body);
        }

        log.info("[{}login] - login bem-sucedido [email={}]", tag, dto.email());
        return new LoginResponseDTO(
                (String) body.get("idToken"),
                (String) body.get("refreshToken")
        );
    }

    public LoginResponseDTO refresh(RefreshTokenRequestDTO refreshToken) {
        log.info("[{}refresh] - iniciando refresh de token", tag);
        String url = "https://securetoken.googleapis.com/v1/token?key=" + firebaseApiKey;
        var payload = Map.<String,Object>of(
                "grant_type", "refresh_token",
                "refresh_token", refreshToken.refreshToken()
        );
        log.debug("[{}refresh] - payload preparado (refreshToken não exibido)", tag);
        HttpEntity<Map<String,Object>> req = new HttpEntity<>(payload, defaultHeaders());

        ResponseEntity<Map> resp;
        try {
            resp = restTemplate.exchange(url, HttpMethod.POST, req, Map.class);
            log.debug("[{}refresh] - resposta HTTP Secure Token [status={}]", tag, resp.getStatusCode());
        } catch (RestClientException e) {
            log.error("[{}refresh] - falha ao renovar token no Firebase", tag, e);
            throw new FirebaseTokenRefreshException("Falha ao renovar token no Firebase", e);
        }

        @SuppressWarnings("unchecked")
        Map<String,Object> body = resp.getBody();
        if (body == null || !body.containsKey("id_token") || !body.containsKey("refresh_token")) {
            log.error("[{}refresh] - resposta inválida do Firebase [body={}]", tag, body);
            throw new FirebaseTokenRefreshException("Resposta inválida do Firebase no refresh: " + body);
        }

        log.info("[{}refresh] - refresh de token bem-sucedido", tag);
        return new LoginResponseDTO(
                (String) body.get("id_token"),
                (String) body.get("refresh_token")
        );
    }

    public void logout(String uid) {
        log.info("[{}logout] - iniciando logout [uid={}]", tag, uid);
        try {
            FirebaseAuth.getInstance().revokeRefreshTokens(uid);
            log.info("[{}logout] - tokens revogados com sucesso [uid={}]", tag, uid);
        } catch (FirebaseAuthException e) {
            log.error("[{}logout] - erro ao revogar tokens [uid={}]", tag, uid, e);
            throw new FirebaseLogoutException("Erro ao revogar tokens do usuário: " + uid, e);
        }
    }

    public String resetPassword(String uid) {
        log.info("[{}resetPassword] - gerando link de reset de senha [uid={}]", tag, uid);
        try {
            UserRecord user = FirebaseAuth.getInstance().getUser(uid);
            String email = user.getEmail();
            String link = FirebaseAuth.getInstance().generatePasswordResetLink(email);
            log.info("[{}resetPassword] - link gerado [uid={}, email={}]", tag, uid, email);
            return link;
        } catch (FirebaseAuthException e) {
            log.error("[{}resetPassword] - erro ao gerar link de reset [uid={}]", tag, uid, e);
            throw new FirebasePasswordResetException("Erro ao gerar link de reset para o usuário: " + uid, e);
        }
    }

    public String createFirebaseUser(UserRequestDTO userRequestDTO) throws FirebaseAuthException {
        log.info("[{}create] - criando novo usuário Firebase [email={}, name={}]", tag, userRequestDTO.email(), userRequestDTO.name());
        UserRecord user = FirebaseAuth.getInstance().createUser(new UserRecord.CreateRequest()
                .setDisplayName(userRequestDTO.name())
                .setEmail(userRequestDTO.email())
                .setPassword(userRequestDTO.password())
                .setPhoneNumber(userRequestDTO.phone()));
        log.info("[{}create] - usuário Firebase criado [uid={}]", tag, user.getUid());
        setUserRole(user.getUid());
        return user.getUid();
    }

    private void setUserRole(String uid) {
        log.info("[{}setUserRole] - definindo papel USER [uid={}]", tag, uid);
        try {
            FirebaseAuth.getInstance().setCustomUserClaims(uid, Map.of("role", "USER"));
            log.info("[{}setUserRole] - papel definido com sucesso [uid={}]", tag, uid);
        } catch (FirebaseAuthException e) {
            log.error("[{}setUserRole] - erro ao definir papel [uid={}]", tag, uid, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "ERRO AO DEFINIR PAPEL DO USUÁRIO.", e);
        }
    }

    private HttpHeaders defaultHeaders() {
        log.debug("[{}defaultHeaders] - criando headers padrão", tag);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    public void deleteFirebaseUser(String uid) {
        log.info("[{}delete] - deletando usuário Firebase [uid={}]", tag, uid);
        try {
            FirebaseAuth.getInstance().deleteUser(uid);
            log.info("[{}delete] - usuário Firebase deletado [uid={}]", tag, uid);
        } catch (FirebaseAuthException e) {
            log.error("[{}delete] - erro ao deletar usuário Firebase [uid={}]", tag, uid, e);
            throw new RuntimeException("Erro ao deletar usuário no Firebase: " + uid, e);
        }
    }

    public void updateFirebaseUser(String uid, UserUpdateDTO userRequest) {
        log.info("[{}update] - iniciando atualização Firebase user [uid={}]", tag, uid);
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);

        if (userRequest.name() != null) {
            updateRequest.setDisplayName(userRequest.name());
            log.debug("[{}update] - novo displayName=[{}]", tag, userRequest.name());
        }
        if (userRequest.email() != null) {
            updateRequest.setEmail(userRequest.email());
            log.debug("[{}update] - novo email=[{}]", tag, userRequest.email());
        }
        if (userRequest.phone() != null) {
            updateRequest.setPhoneNumber(userRequest.phone());
            log.debug("[{}update] - novo phoneNumber=[{}]", tag, userRequest.phone());
        }
        if (userRequest.photo() != null) {
            updateRequest.setPhotoUrl(userRequest.photo());
            log.debug("[{}update] - novo photoUrl=[{}]", tag, userRequest.photo());
        }

        try {
            FirebaseAuth.getInstance().updateUser(updateRequest);
            log.info("[{}update] - Firebase user atualizado com sucesso [uid={}]", tag, uid);
        } catch (FirebaseAuthException e) {
            log.error("[{}update] - erro ao atualizar usuário Firebase [uid={}]", tag, uid, e);
            throw new RuntimeException("Erro ao atualizar usuário no Firebase: " + uid, e);
        }
    }
}
