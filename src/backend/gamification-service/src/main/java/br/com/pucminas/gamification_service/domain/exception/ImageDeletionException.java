package br.com.pucminas.gamification_service.domain.exception;

import org.springframework.http.HttpStatus;

public class ImageDeletionException extends ApiException {
    public ImageDeletionException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ImageDeletionException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
