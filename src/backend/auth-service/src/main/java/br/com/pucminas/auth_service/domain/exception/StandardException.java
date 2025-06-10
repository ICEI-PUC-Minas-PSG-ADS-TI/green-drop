package br.com.pucminas.auth_service.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardException {
    private String message;
    private int error;
    private String path;
    private LocalDateTime timestamp;
}
