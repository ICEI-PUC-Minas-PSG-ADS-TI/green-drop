package br.com.pucminas.gamification_service.domain.repository;

import br.com.pucminas.gamification_service.adapter.out.persistence.UserAchievementProgressRepositoryJpa;
import br.com.pucminas.gamification_service.domain.model.user.UserAchievementProgress;

import java.util.List;

public interface UserAchievementProgressRepository extends UserAchievementProgressRepositoryJpa {
    List<UserAchievementProgress> findAllByUserId(Long userId);
}
