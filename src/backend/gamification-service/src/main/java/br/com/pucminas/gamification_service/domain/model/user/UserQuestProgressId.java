package br.com.pucminas.gamification_service.domain.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data @AllArgsConstructor @NoArgsConstructor
public class UserQuestProgressId implements Serializable {
    private Long userId;
    private Long questId;
}
