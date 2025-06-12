package br.com.puc.report_service.application.service;

import br.com.puc.report_service.application.client.ImageClient;
import br.com.puc.report_service.domain.exception.ApiException;
import br.com.puc.report_service.domain.exception.PhotoUploadException;
import br.com.puc.report_service.domain.exception.ReportNotFound;
import br.com.puc.report_service.domain.model.Report;
import br.com.puc.report_service.domain.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository repository;
    private final ImageClient imageClient;
    
    public URI makeReport(Report report, MultipartFile photo) {
        log.info("create - iniciando criação de reporte [descricao={}]", report.getDescription());
        String photoUrl = null;

        try {
            log.debug("uploadPhoto - iniciando upload de foto para descricao={}", report.getDescription());
            photoUrl = uploadPhoto(photo);
            String imageId = extractImageId(photoUrl);
            log.debug("uploadPhoto - concluído upload, photoUrl={} (imageId={})", photoUrl, imageId);


            report.setPhotoUrl(photoUrl);

            log.debug("create - salvando reporte no banco [descricao={}]", report.getDescription());
            Report saved = repository.save(report);
            log.info("create - reporte criado com sucesso [descricao={}]", saved.getId());
            return URI.create("/v1/users/" + saved.getId());
        }  catch (Exception ex) {
            log.error("create - erro durante criação do reporte, iniciando rollback [photoUrl={}]", photoUrl, ex);
            if (photoUrl != null) {
            try {
                String imageId = extractImageId(photoUrl);
                imageClient.delete(imageId);
                log.debug("create - cleanup: imagem {} deletada", imageId);
            } catch (Exception e) {
                log.error("create - cleanup falhou ao remover foto do storage {}", photoUrl, e);
            }
        }
        throw ex;
        }
    }

    public List<Report> list() {
        return repository.findAll();
    }

    public Report getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                {
                    log.warn("getById - usuário não encontrado id={}", id);
                    return new ReportNotFound("REPORT NAO ENCONTRADO ::: " + id);
                });
    }

    public void validate(Long id, String status) {
        Report oldReport = repository.findById(id).orElseThrow(() ->
        {
            log.warn("getById - usuário não encontrado id={}", id);
            return new ReportNotFound("REPORT NAO ENCONTRADO ::: " + id);
        });
        oldReport.setStatus(status);
        repository.save(oldReport);

    }

    public void delete(Long id) {
        repository.findById(id).orElseThrow(() ->
        {
            log.warn("getById - usuário não encontrado id={}", id);
            return new ReportNotFound("REPORT NAO ENCONTRADO ::: " + id);
        });
        repository.deleteById(id);
    }

    String uploadPhoto(MultipartFile photo) {
        log.debug("uploadPhoto - iniciando upload de foto (tamanho={} bytes)", photo.getSize());
        try {
            String url = imageClient.upload(photo);
            log.debug("uploadPhoto - upload concluído, url={}", url);
            return url;
        } catch (IOException | RestClientException e) {
            log.error("uploadPhoto - erro ao enviar foto", e);
            throw new PhotoUploadException("FALHA AO ENVIAR FOTO DO USUÁRIO ::: ", e);
        }
    }

    private String extractImageId(String photoUrl) {
        log.trace("extractImageId - photoUrl={}", photoUrl);
        if (photoUrl == null || photoUrl.isBlank()) {
            log.error("extractImageId - URL da foto inválida");
            throw new ApiException("URL DA FOTO INVÁLIDA PARA O USUÁRIO ::: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        String imageId = parts[parts.length - 1];
        log.trace("extractImageId - imageId={}", imageId);
        return imageId;
    }
}
