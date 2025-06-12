package br.com.pucminas.image_service.adapter.doc;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@Tag(name = "Image", description = "Image API")
public interface ImageControllerDoc {
    @Operation(summary = "Faz upload de uma imagem vinculada a um relatório")
    ResponseEntity<String> upload(@Parameter(description = "Arquivo de imagem (PNG, JPG, etc.)", required = true) @RequestPart("photo") MultipartFile file) throws IOException;

    @Operation(summary = "Busca uma imagem pelo seu ID")
    ResponseEntity<String> getById(@Parameter(description = "ID da imagem", required = true) @PathVariable("imageId") String imageId);

    @Operation(summary = "Deleta uma imagem pelo seu ID")
    ResponseEntity<Void> delete(@Parameter(description = "ID da imagem a ser removida", required = true) @PathVariable("imageId") String imageId);
}
