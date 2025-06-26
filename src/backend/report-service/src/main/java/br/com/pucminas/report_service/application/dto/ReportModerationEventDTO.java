package br.com.pucminas.report_service.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportModerationEventDTO {
    private Long reportId;
    private Long userId;
    private boolean valid;
}