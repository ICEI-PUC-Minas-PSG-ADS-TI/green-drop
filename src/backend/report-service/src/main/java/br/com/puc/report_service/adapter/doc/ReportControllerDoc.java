package br.com.puc.report_service.adapter.doc;

import br.com.puc.report_service.domain.model.Report;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Report", description = "Operations related to reports")
public interface ReportControllerDoc {
    @Operation(summary = "Realiza reporte")
    ResponseEntity<Void> makeReport(@RequestPart("report")Report report, @RequestPart("photo")MultipartFile photo);

    @Operation(summary = "Lista reportes")
    ResponseEntity<List<Report>> listReports();

    @Operation(summary = "Get reoprt by ID")
    ResponseEntity<Report> getById(@PathVariable Long id);

    @Operation(summary = "Validar reporte")
    ResponseEntity<Void> validateReport(@PathVariable("id") Long id, String status);

    @Operation(summary = "Deletar reporte")
    ResponseEntity<Void> deletarReport(@PathVariable("id") Long id);
}
