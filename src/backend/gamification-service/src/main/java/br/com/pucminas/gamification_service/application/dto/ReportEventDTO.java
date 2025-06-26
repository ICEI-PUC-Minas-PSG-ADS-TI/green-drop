package br.com.pucminas.gamification_service.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportEventDTO {
    private Long reportId;
    private Long userId;
}