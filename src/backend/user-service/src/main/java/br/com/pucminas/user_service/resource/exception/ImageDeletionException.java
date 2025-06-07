package br.com.pucminas.user_service.resource.exception;

import org.springframework.http.HttpStatus;

public class ImageDeletionException extends ApiException {
    public ImageDeletionException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ImageDeletionException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
