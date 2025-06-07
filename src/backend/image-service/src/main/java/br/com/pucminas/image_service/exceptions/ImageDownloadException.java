package br.com.pucminas.image_service.exceptions;

import org.springframework.http.HttpStatus;

public class ImageDownloadException extends ApiException {
    public ImageDownloadException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public ImageDownloadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
