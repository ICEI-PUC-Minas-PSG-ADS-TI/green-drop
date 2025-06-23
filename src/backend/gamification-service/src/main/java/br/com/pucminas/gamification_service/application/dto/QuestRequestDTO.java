package br.com.pucminas.gamification_service.application.dto;


import java.time.OffsetDateTime;

public record QuestRequestDTO(String title, String description, String questType, OffsetDateTime startAt, OffsetDateTime endAt, OffsetDateTime createdAt) {
}
