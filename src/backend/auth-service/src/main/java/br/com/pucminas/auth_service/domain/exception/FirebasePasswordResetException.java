package br.com.pucminas.auth_service.domain.exception;

import org.springframework.http.HttpStatus;

public class FirebasePasswordResetException extends ApiException {
    public FirebasePasswordResetException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public FirebasePasswordResetException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
