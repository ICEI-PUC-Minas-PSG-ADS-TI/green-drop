// src/main/java/br/com/pucminas/gamification_service/application/service/QuestService.java
package br.com.pucminas.gamification_service.application.service;

import br.com.pucminas.gamification_service.application.dto.QuestRequestDTO;
import br.com.pucminas.gamification_service.domain.model.quest.Quest;
import br.com.pucminas.gamification_service.domain.model.user.UserQuestProgress;
import br.com.pucminas.gamification_service.domain.repository.QuestRepository;
import br.com.pucminas.gamification_service.domain.repository.UserQuestProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestService {
    private final QuestRepository questRepo;
    private final UserQuestProgressRepository progressRepo;

    public Quest create(QuestRequestDTO dto) {
        Quest q = Quest.builder()
                .title(dto.title())
                .description(dto.description())
                .questType(dto.questType())
                .startAt(dto.startAt())
                .endAt(dto.endAt())
                .createdAt(dto.createdAt())
                .build();
        return questRepo.save(q);
    }

    public List<Quest> listQuests() {
        return questRepo.findAll();
    }

    public List<UserQuestProgress> getProgress(Long userId) {
        return progressRepo.findAllByUserId(userId);
    }
}
