package br.com.pucminas.report_service.adapter.in.web.exception;


import br.com.pucminas.report_service.domain.exception.ApiException;
import br.com.pucminas.report_service.domain.exception.StandardException;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardException> handleGeneric(Exception ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new StandardException(
                        ex.getMessage(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        request.getRequestURI(),
                        LocalDateTime.now()
                ));
    }
}
