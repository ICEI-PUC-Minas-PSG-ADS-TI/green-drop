package br.com.pucminas.report_service.application.dto;

public record GamificationEventDTO(Long userId, String type, String categoryId, String relevance) {
}
