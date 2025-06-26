package br.com.pucminas.gamification_service.adapter.in.web;

import br.com.pucminas.gamification_service.application.dto.ReportEventDTO;
import br.com.pucminas.gamification_service.application.dto.ReportModerationEventDTO;
import br.com.pucminas.gamification_service.application.service.GamificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final GamificationService gamificationService;

    @PostMapping("/reports/created")
    public ResponseEntity<Void> reportCreated(@RequestBody ReportEventDTO evt) {
        gamificationService.onReportCreated(evt.getUserId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reports/moderated")
    public ResponseEntity<Void> reportModerated(@RequestBody ReportModerationEventDTO evt) {
        gamificationService.onReportModerated(evt.getUserId(), evt.isValid());
        return ResponseEntity.ok().build();
    }
}
