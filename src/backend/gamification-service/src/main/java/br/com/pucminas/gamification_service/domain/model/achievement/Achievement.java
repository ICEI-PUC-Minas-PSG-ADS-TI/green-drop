package br.com.pucminas.gamification_service.domain.model.achievement;

import br.com.pucminas.gamification_service.domain.model.quest.Quest;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data @Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "achievement")
public class Achievement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @ManyToMany
    @JoinTable(
            name = "achievement_quest",
            joinColumns = @JoinColumn(name = "achievement_id"),
            inverseJoinColumns = @JoinColumn(name = "quest_id")
    )
    private Set<Quest> quests = new HashSet<>();
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "text")
    private String description;
    @Column(name = "goal_type", nullable = false)
    private String goalType;
    @Column(name = "goal_count", nullable = false)
    private Integer goalCount;
}
