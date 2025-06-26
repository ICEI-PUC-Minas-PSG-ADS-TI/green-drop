package br.com.pucminas.gamification_service.domain.model.quest;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data @Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "quest")
public class Quest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "text")
    private String description;
    @Column(name = "quest_type")
    private String questType;
    @Column(name = "start_at")
    private OffsetDateTime startAt;
    @Column(name = "end_at")
    private OffsetDateTime endAt;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
