package br.com.puc.report_service.adapter.in.web;

import br.com.puc.report_service.adapter.doc.ReportControllerDoc;
import br.com.puc.report_service.application.service.ReportService;
import br.com.puc.report_service.domain.model.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/v1/reports")
@RequiredArgsConstructor
public class ReportController implements ReportControllerDoc {
    private final ReportService reportService;

    public ResponseEntity<Void> makeReport(Report report, MultipartFile photo) {
        return ResponseEntity.created(reportService.makeReport(report, photo)).body();
    }

    public ResponseEntity<List<Report>> listReports() {
        return ResponseEntity.ok(reportService.list());
    }

    public ResponseEntity<Report> getById(Long id) {
        return ResponseEntity.ok(reportService.getById(id));
    }

    public ResponseEntity<Void> validateReport(Long id, String status) {
        reportService.validate(id, status);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> deletarReport(Long id) {
        reportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
