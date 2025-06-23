package br.com.pucminas.report_service.adapter.doc;

import br.com.pucminas.report_service.application.dto.ReportRequestDTO;
import br.com.pucminas.report_service.domain.model.Report;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Tag(name = "Relatório", description = "Operações relacionadas a relatórios")
public interface ReportControllerDoc {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Criar relatório",
            description = "Recebe os dados de um relatório e uma imagem vinculada, criando um novo registro no sistema."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Relatório criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida ou dados ausentes"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao processar o relatório")
    })
    ResponseEntity<Void> makeReport(
            @Parameter(description = "Dados do relatório", required = true)
            @RequestPart("report") ReportRequestDTO report,

            @Parameter(description = "Imagem associada ao relatório (PNG, JPG, etc.)", required = true)
            @RequestPart("photo") MultipartFile photo
    ) throws IOException;

    @GetMapping
    @Operation(
            summary = "Listar relatórios",
            description = "Retorna todos os relatórios cadastrados no sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista de relatórios retornada com sucesso")
    ResponseEntity<List<Report>> listReports();

    @GetMapping("/user/{id}")
    @Operation(
            summary = "Listar relatórios por usuário",
            description = "Retorna todos os relatórios associados ao usuário informado."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Relatórios do usuário retornados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado ou sem relatórios")
    })
    ResponseEntity<List<Report>> listByUserId(
            @Parameter(description = "ID do usuário", example = "1", required = true)
            @PathVariable("id") Long id
    );

    @GetMapping("/{id}")
    @Operation(
            summary = "Obter relatório por ID",
            description = "Busca um relatório pelo seu identificador único."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Relatório encontrado"),
            @ApiResponse(responseCode = "404", description = "Relatório não encontrado")
    })
    ResponseEntity<Report> getById(
            @Parameter(description = "ID do relatório", example = "100", required = true)
            @PathVariable Long id
    );

    @PatchMapping(path = "/{id}/status")
    @Operation(
            summary = "Validar relatório",
            description = "Atualiza o status do relatório para APPROVED ou REJECTED."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Status atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Status inválido"),
            @ApiResponse(responseCode = "404", description = "Relatório não encontrado")
    })
    ResponseEntity<Void> validateReport(
            @Parameter(description = "ID do relatório", example = "100", required = true)
            @PathVariable("id") Long id,

            @Parameter(description = "Novo status do relatório", example = "APPROVED", required = true)
            @RequestParam("status") String status
    );

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Excluir relatório",
            description = "Remove o relatório identificado pelo ID informado."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Relatório excluído com sucesso"),
            @ApiResponse(responseCode = "404", description = "Relatório não encontrado")
    })
    ResponseEntity<Void> deletarReport(
            @Parameter(description = "ID do relatório", example = "100", required = true)
            @PathVariable("id") Long id
    );
}
