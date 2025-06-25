package br.com.pucminas.gamification_service.adapter.out.persistence;

import br.com.pucminas.gamification_service.domain.model.user.UserQuestProgress;
import br.com.pucminas.gamification_service.domain.model.user.UserQuestProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserQuestProgressRepositoryJpa extends JpaRepository<UserQuestProgress, UserQuestProgressId> {
    List<UserQuestProgress> findAllByUserId(Long userId);
    void deleteAllByUserIdAndQuestId(Long userId, Long questId);
}
