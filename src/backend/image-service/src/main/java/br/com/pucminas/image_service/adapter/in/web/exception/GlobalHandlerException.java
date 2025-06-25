package br.com.pucminas.image_service.adapter.in.web.exception;

import br.com.pucminas.image_service.domain.exception.ApiException;
import br.com.pucminas.image_service.domain.exception.StandardException;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@Hidden
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
