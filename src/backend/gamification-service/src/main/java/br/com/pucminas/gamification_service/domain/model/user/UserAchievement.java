package br.com.pucminas.gamification_service.domain.model.user;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data @Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_achievements")
@IdClass(UserAchievementId.class)
public class UserAchievement {
    @Id @Column(name = "user_id", nullable = false)
    private Long userId;
    @Id @Column(name = "achievement_id", nullable = false)
    private String achievementId;
    @Column(nullable = false)
    private Boolean unlocked = false;
    @Column(name = "unlocked_at")
    private OffsetDateTime unlockedAt;
}
