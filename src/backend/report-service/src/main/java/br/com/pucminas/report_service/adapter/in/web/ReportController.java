package br.com.pucminas.report_service.adapter.in.web;

import br.com.pucminas.report_service.application.dto.ReportRequestDTO;
import br.com.pucminas.report_service.application.service.ReportService;
import br.com.pucminas.report_service.domain.model.Report;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/v1/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> makeReport(
            @RequestPart("report") ReportRequestDTO report,
            @RequestPart("photo") MultipartFile photo
    ) {
        return ResponseEntity.created(reportService.create(report, photo)).build();
    }

    @GetMapping
    public ResponseEntity<List<Report>> listReports() {
        return ResponseEntity.ok(reportService.listAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Report>> listByUserId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(reportService.listByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> validateReport(
            @PathVariable("id") Long id,
            @RequestParam("status") String status) {
        reportService.updateStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarReport(@PathVariable("id") Long id) {
        reportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
