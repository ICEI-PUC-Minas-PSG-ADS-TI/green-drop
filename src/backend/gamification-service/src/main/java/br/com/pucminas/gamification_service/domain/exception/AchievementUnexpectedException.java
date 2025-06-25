package br.com.pucminas.gamification_service.domain.exception;

import org.springframework.http.HttpStatus;

public class AchievementUnexpectedException extends ApiException {
    public AchievementUnexpectedException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public AchievementUnexpectedException(String message, String status) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
