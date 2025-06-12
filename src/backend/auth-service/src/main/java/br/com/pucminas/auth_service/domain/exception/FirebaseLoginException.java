package br.com.pucminas.auth_service.domain.exception;

import org.springframework.http.HttpStatus;

public class FirebaseLoginException extends ApiException {
    public FirebaseLoginException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
    public FirebaseLoginException(String message, Throwable cause) {
        super(message, HttpStatus.UNAUTHORIZED, cause);
    }
}
