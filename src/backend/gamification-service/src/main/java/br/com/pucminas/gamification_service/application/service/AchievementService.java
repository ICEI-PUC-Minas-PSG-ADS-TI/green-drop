package br.com.pucminas.gamification_service.application.service;

import br.com.pucminas.gamification_service.application.dto.AchievementRequestDTO;
import br.com.pucminas.gamification_service.domain.model.achievement.Achievement;
import br.com.pucminas.gamification_service.domain.model.quest.Quest;
import br.com.pucminas.gamification_service.domain.model.user.UserAchievementProgress;
import br.com.pucminas.gamification_service.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AchievementService {
    private final AchievementRepository achRepo;
    private final QuestRepository questRepo;
    private final AchievementGoalRepository goalRepo;
    private final UserAchievementProgressRepository userGoalRepo;

    public void create(AchievementRequestDTO dto) {
        Quest quests = (Quest) dto.quest().stream()
                .map(rq -> questRepo.findByTitle(rq.title())
                        .orElseThrow(() -> new IllegalArgumentException("Quest não encontrada: " + rq.title())))
                .collect(Collectors.toSet());

        Achievement ach = Achievement.builder()
                .title(dto.title())
                .description(dto.description())
                .goalType(dto.goalType())
                .goalCount(dto.goalCount())
                .quests((Set<Quest>) quests)
                .build();

        ach = achRepo.save(ach);
    }

    public List<Achievement> list() {
        return achRepo.findAll();
    }

    public List<UserAchievementProgress> getProgress(Long userId) {
        return userGoalRepo.findAllByUserId(userId);
    }
}
