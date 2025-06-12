package br.com.puc.report_service.domain.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final HttpStatus status;

    public ApiException(String message, HttpStatus status, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
