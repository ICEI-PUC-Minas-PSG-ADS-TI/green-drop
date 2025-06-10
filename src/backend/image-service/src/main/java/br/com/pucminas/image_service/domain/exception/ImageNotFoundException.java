package br.com.pucminas.image_service.adapter.in.web.exception;

import org.springframework.http.HttpStatus;

public class ImageNotFoundException extends ApiException {
    public ImageNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
    public ImageNotFoundException(String message, Throwable cause) {
        super(message, HttpStatus.NOT_FOUND, cause);
    }
}
