package br.com.pucminas.gamification_service.domain.repository;

import br.com.pucminas.gamification_service.adapter.out.persistence.QuestRepositoryJpa;

import java.util.Optional;

public interface QuestRepository extends QuestRepositoryJpa {
    Optional<Object> findByTitle(String title);
}