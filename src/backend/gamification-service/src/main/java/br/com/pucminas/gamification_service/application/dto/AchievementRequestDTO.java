package br.com.pucminas.gamification_service.application.dto;

import java.util.List;

public record AchievementRequestDTO(String title, String description, String goalType, Integer goalCount, List<QuestRequestDTO> quest) {
}