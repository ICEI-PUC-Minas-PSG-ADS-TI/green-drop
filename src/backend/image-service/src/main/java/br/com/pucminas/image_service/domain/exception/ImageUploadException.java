package br.com.pucminas.image_service.adapter.in.web.exception;

import org.springframework.http.HttpStatus;

public class ImageUploadException extends ApiException {
    public ImageUploadException(String message, String eMessage) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ImageUploadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
