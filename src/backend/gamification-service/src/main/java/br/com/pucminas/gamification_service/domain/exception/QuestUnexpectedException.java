package br.com.pucminas.gamification_service.domain.exception;

import org.springframework.http.HttpStatus;

public class QuestUnexpectedException extends ApiException{
    public QuestUnexpectedException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public QuestUnexpectedException(String message, String status) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
