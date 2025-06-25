package br.com.pucminas.gamification_service.domain.exception;

import org.springframework.http.HttpStatus;

public class AchievementNotFoundException extends ApiException {
    public AchievementNotFoundException(String message, Long id) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
