package br.com.pucminas.gamification_service.domain.model.user;

import jakarta.persistence.*;
import lombok.*;

@Data @Entity @NoArgsConstructor @AllArgsConstructor @Builder
@Table(name = "user_quest_progress")
@IdClass(UserQuestProgressId.class)
public class UserQuestProgress {
    @Id @Column(name = "user_id", nullable = false)
    private Long userId;

    @Id @Column(name = "quest_id", nullable = false)
    private Long questId;

    @Column(nullable = false)
    @Builder.Default
    private Integer current = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean done = false;
}
