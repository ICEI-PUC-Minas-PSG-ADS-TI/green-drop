package br.com.pucminas.gamification_service.domain.exception;

import org.springframework.http.HttpStatus;

public class QuestNotFoundException extends ApiException {
    public QuestNotFoundException(String message, Long id) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
