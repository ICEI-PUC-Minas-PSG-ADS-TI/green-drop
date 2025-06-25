package br.com.pucminas.gamification_service.adapter.out.persistence;

import br.com.pucminas.gamification_service.domain.model.quest.Quest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestRepositoryJpa extends JpaRepository<Quest, Long> {
}
