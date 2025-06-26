package br.com.pucminas.report_service.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ReportRequestDTO(
        Long userId,
        String description,
        LocalDateTime createdAt,
        BigDecimal latitude,
        BigDecimal longitude,
        String category,
        String problemType,
        String relevance) {
}
