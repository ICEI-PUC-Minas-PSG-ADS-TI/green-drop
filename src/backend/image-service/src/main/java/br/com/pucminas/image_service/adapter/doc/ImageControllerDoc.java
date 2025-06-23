package br.com.pucminas.image_service.adapter.doc;

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
import java.net.URI;
import java.util.UUID;

@Tag(name = "Imagem", description = "Operações de upload, recuperação e remoção de imagens vinculadas a relatórios")
public interface ImageControllerDoc {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Upload de imagem",
            description = "Recebe um arquivo de imagem (PNG, JPG, etc.) e retorna a URL ou o identificador da imagem criada."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Imagem enviada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Formato de arquivo inválido ou dados ausentes"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao processar a imagem")
    })
    ResponseEntity<String> upload(
            @Parameter(
                    description = "Arquivo de imagem a ser enviado (campo 'photo')",
                    required = true,
                    example = "arquivo.png"
            )
            @RequestPart("photo") MultipartFile file
    ) throws IOException;

    @GetMapping("/{imageId}")
    @Operation(
            summary = "Recuperar imagem por ID",
            description = "Retorna os metadados ou a URL de acesso da imagem associada ao ID informado."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Imagem encontrada e retornada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Nenhuma imagem encontrada para o ID informado")
    })
    ResponseEntity<String> getById(
            @Parameter(
                    description = "Identificador único da imagem (UUID)",
                    required = true,
                    example = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            )
            @PathVariable("imageId") String imageId
    );

    @DeleteMapping("/{imageId}")
    @Operation(
            summary = "Excluir imagem",
            description = "Remove a imagem associada ao ID informado do armazenamento."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Imagem removida com sucesso"),
            @ApiResponse(responseCode = "404", description = "Nenhuma imagem encontrada para o ID informado")
    })
    ResponseEntity<Void> delete(
            @Parameter(
                    description = "Identificador único da imagem a ser removida",
                    required = true,
                    example = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            )
            @PathVariable("imageId") String imageId
    );
}
