package br.com.pucminas.gamification_service.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardException {
    private String message;
    private int status;
    private String path;
    private LocalDateTime timestamp;
}
