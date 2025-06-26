package br.com.pucminas.gamification_service.adapter.out.persistence;

import br.com.pucminas.gamification_service.domain.model.user.UserAchievement;
import br.com.pucminas.gamification_service.domain.model.user.UserAchievementId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAchievementRepositoryJpa extends JpaRepository<UserAchievement, UserAchievementId> {
}
