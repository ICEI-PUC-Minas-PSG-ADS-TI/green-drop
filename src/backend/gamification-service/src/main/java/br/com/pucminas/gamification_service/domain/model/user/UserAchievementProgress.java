package br.com.pucminas.gamification_service.domain.model.user;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UserAchievementProgressId.class)
@Table(name = "user_achievement_progress")
public class UserAchievementProgress {
    @Id @Column(name = "user_id", nullable = false)
    private Long userId;
    @Id @Column(name = "goal_id", nullable = false)
    private Long goalId;
    @Column(name = "achievement_id", nullable = false)
    private Long achievementId;
    @Column(nullable = false)
    private Integer current = 0;
    @Column(nullable = false)
    private Boolean done = false;
}
