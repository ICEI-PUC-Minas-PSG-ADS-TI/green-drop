package br.com.pucminas.auth_service.adapter.in.web.exception;

import br.com.pucminas.auth_service.domain.exception.ApiException;
import br.com.pucminas.auth_service.domain.exception.StandardException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<StandardException> handleApiException(ApiException exception, HttpServletRequest request) {
        return ResponseEntity.status(exception.getStatus()).body(new StandardException(
                exception.getMessage(),
                exception.getStatus().value(),
                request.getRequestURI(),
                LocalDateTime.now()
        ));
    }
}
