package br.com.pucminas.image_service.adapter.in.web.exception;

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
