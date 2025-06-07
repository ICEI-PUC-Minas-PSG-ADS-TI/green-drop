package br.com.pucminas.auth_service.exceptions;

import org.springframework.http.HttpStatus;

public class FirebaseLogoutException extends ApiException {
    public FirebaseLogoutException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public FirebaseLogoutException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
