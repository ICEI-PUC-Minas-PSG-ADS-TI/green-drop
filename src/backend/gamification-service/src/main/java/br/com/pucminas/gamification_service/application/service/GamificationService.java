package br.com.pucminas.gamification_service.application.service;

import br.com.pucminas.gamification_service.application.client.UserServiceClient;
import br.com.pucminas.gamification_service.domain.model.user.UserQuestProgress;
import br.com.pucminas.gamification_service.domain.model.user.UserQuestProgressId;
import br.com.pucminas.gamification_service.domain.repository.*;
import br.com.pucminas.gamification_service.domain.model.achievement.AchievementGoal;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GamificationService {
    private final UserServiceClient userClient;
    private final QuestService questService;
    private final AchievementService achievementService;
    private final UserQuestProgressRepository questProgressRepo;
    private final UserAchievementProgressRepository achProgressRepo;
    private final AchievementGoalRepository goalRepo;

    private static final int POINTS_PER_REPORT = 10;

    @Transactional
    public void onReportCreated(Long userId) {
        userClient.adjustPoints(userId, +POINTS_PER_REPORT);
        questService.listQuests().forEach(quest -> {
            var key = new UserQuestProgressId(userId, quest.getId());
            UserQuestProgress prog = questProgressRepo.findById(key)
                    .orElseGet(() -> UserQuestProgress.builder()
                            .userId(userId)
                            .questId(quest.getId())
                            .build());

            prog.setCurrent(prog.getCurrent() + 1);
            questProgressRepo.save(prog);
        });
        achievementService.list().forEach(ach -> {
            achievementService.getProgress(userId).stream()
                    .filter(gp -> gp.getAchievementId().equals(ach.getId()))
                    .forEach(gp -> {
                        gp.setCurrent(gp.getCurrent() + 1);
                        AchievementGoal goal = goalRepo.findById(gp.getGoalId())
                                .orElseThrow(() -> new IllegalStateException(
                                        "Meta não encontrada: " + gp.getGoalId()));
                        if (gp.getCurrent() >= goal.getTarget()) {
                            gp.setDone(true);
                        }

                        achProgressRepo.save(gp);
                    });
        });
    }

    @Transactional
    public void onReportModerated(Long userId, boolean valid) {
        if (valid) {
            return;
        }
        userClient.adjustPoints(userId, -POINTS_PER_REPORT);
        questService.listQuests().forEach(q -> {
            var key = new UserQuestProgressId(userId, q.getId());
            questProgressRepo.findById(key).ifPresent(prog -> {
                prog.setCurrent(Math.max(0, prog.getCurrent() - 1));
                questProgressRepo.save(prog);
            });
        });
        achievementService.list().forEach(ach -> {
            achievementService.getProgress(userId).stream()
                    .filter(gp -> gp.getAchievementId().equals(ach.getId()))
                    .forEach(gp -> {
                        gp.setCurrent(Math.max(0, gp.getCurrent() - 1));
                        AchievementGoal goal = goalRepo.findById(gp.getGoalId())
                                .orElseThrow(() -> new IllegalStateException(
                                        "Meta não encontrada: " + gp.getGoalId()));
                        if (gp.getCurrent() < goal.getTarget()) {
                            gp.setDone(false);
                        }
                        achProgressRepo.save(gp);
                    });
        });
    }
}
