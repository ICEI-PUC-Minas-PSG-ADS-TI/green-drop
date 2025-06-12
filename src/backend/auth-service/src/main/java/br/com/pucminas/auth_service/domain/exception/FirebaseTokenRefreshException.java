package br.com.pucminas.auth_service.domain.exception;

import org.springframework.http.HttpStatus;

public class FirebaseTokenRefreshException extends ApiException {
    public FirebaseTokenRefreshException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
    public FirebaseTokenRefreshException(String message, Throwable cause) {
        super(message, HttpStatus.UNAUTHORIZED, cause);
    }
}
