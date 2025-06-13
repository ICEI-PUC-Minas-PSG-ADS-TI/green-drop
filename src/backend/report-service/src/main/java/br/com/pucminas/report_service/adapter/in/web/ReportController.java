package br.com.pucminas.report_service.adapter.in.web;

import br.com.pucminas.report_service.adapter.doc.ReportControllerDoc;
import br.com.pucminas.report_service.application.dto.ReportRequestDTO;
import br.com.pucminas.report_service.application.service.ReportService;
import br.com.pucminas.report_service.domain.model.Report;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/v1/reports")
@RequiredArgsConstructor
public class ReportController implements ReportControllerDoc {
    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<Void> makeReport(ReportRequestDTO report, MultipartFile photo) {
        return ResponseEntity.created(reportService.create(report, photo)).build();
    }

    @GetMapping
    public ResponseEntity<List<Report>> listReports() {
        return ResponseEntity.ok(reportService.listAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Report>> listByUserId(Long id) {
        return ResponseEntity.ok(reportService.listByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getById(Long id) {
        return ResponseEntity.ok(reportService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> validateReport(Long id, String status) {
        reportService.updateStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarReport(Long id) {
        reportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
