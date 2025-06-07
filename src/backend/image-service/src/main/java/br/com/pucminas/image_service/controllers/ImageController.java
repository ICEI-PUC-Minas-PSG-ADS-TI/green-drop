package br.com.pucminas.image_service.controllers;

import br.com.pucminas.image_service.controllers.docs.ImageControllerDoc;
import br.com.pucminas.image_service.services.ImageService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController implements ImageControllerDoc {
    private final ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<URI> upload(MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(imageService.upload(file));
    }

    @GetMapping(value = "/{imageId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getById(String imageId) {
        return ResponseEntity.ok(imageService.getById(imageId));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> delete(String imageId) {
        imageService.delete(imageId);
        return ResponseEntity.noContent().build();
    }
}
