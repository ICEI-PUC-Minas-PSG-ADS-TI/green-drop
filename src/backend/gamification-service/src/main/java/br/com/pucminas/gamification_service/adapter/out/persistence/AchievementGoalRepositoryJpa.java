package br.com.pucminas.gamification_service.adapter.out.persistence;

import br.com.pucminas.gamification_service.domain.model.achievement.AchievementGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievementGoalRepositoryJpa extends JpaRepository<AchievementGoal, Long> {
}
