package br.com.pucminas.gamification_service.adapter.out.persistence;

import br.com.pucminas.gamification_service.domain.model.user.UserAchievementProgress;
import br.com.pucminas.gamification_service.domain.model.user.UserAchievementProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAchievementProgressRepositoryJpa extends JpaRepository<UserAchievementProgress, UserAchievementProgressId> {
}
