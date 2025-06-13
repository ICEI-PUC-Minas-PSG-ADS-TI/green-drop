package br.com.pucminas.report_service.adapter.doc;

import br.com.pucminas.report_service.application.dto.ReportRequestDTO;
import br.com.pucminas.report_service.domain.model.Report;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Report", description = "Operations related to reports")
public interface ReportControllerDoc {
    @Operation(summary = "Realiza reporte")
    ResponseEntity<Void> makeReport(@RequestPart("report") ReportRequestDTO report, @RequestPart("photo")MultipartFile photo);

    @Operation(summary = "Lista reportes")
    ResponseEntity<List<Report>> listReports();

    @Operation(summary = "Lista reportes de um unico usuario")
    ResponseEntity<List<Report>> listByUserId(@PathVariable("id") Long id);

    @Operation(summary = "Get reoprt by ID")
    ResponseEntity<Report> getById(@PathVariable Long id);

    @Operation(summary = "Validar reporte")
    ResponseEntity<Void> validateReport(@PathVariable("id") Long id, @RequestParam("status") String status);

    @Operation(summary = "Deletar reporte")
    ResponseEntity<Void> deletarReport(@PathVariable("id") Long id);
}
