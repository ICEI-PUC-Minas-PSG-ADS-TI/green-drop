package br.com.pucminas.report_service.application.client;

import br.com.pucminas.report_service.application.dto.GamificationEventDTO;
import br.com.pucminas.report_service.application.dto.ReportModerationEventDTO;
import br.com.pucminas.report_service.config.FeignJsonConfig;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "gamification-service",
        url = "${gamification.service.url:http://localhost:8080/v1/gamification}",
        configuration = FeignJsonConfig.class
)
public interface GamificationClient {
    @PostMapping("/reports/created")
    void processReportCreated(@RequestBody GamificationEventDTO event);

    @PostMapping("/reports/moderated")
    void processReportModerated(@RequestBody ReportModerationEventDTO event);
}
