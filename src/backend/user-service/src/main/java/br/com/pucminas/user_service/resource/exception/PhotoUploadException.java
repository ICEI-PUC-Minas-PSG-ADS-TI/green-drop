package br.com.pucminas.user_service.resource.exception;

import org.springframework.http.HttpStatus;

public class PhotoUploadException extends ApiException {
    public PhotoUploadException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public PhotoUploadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
