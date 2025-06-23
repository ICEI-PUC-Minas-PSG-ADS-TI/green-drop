package br.com.pucminas.report_service.application.service;

import br.com.pucminas.report_service.application.client.GamificationClient;
import br.com.pucminas.report_service.application.client.ImageClient;
import br.com.pucminas.report_service.application.dto.GamificationEventDTO;
import br.com.pucminas.report_service.application.dto.ReportRequestDTO;
import br.com.pucminas.report_service.domain.exception.ApiException;
import br.com.pucminas.report_service.domain.exception.PhotoUploadException;
import br.com.pucminas.report_service.domain.exception.ReportNotFound;
import br.com.pucminas.report_service.domain.model.Report;
import br.com.pucminas.report_service.domain.repository.ReportRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository repository;
    private final ImageClient imageClient;
    private final GamificationClient gamificationClient;
    private final String tag = "ms.report.service.";

    @Transactional(rollbackFor = Exception.class)
    public URI create(ReportRequestDTO dto, MultipartFile photo) {
        log.info("[{}create] Criando novo report [userId={}, description={}]", tag, dto.userId(), dto.description());
        String photoUrl = null;
        try {
            photoUrl = uploadPhoto(photo);
            Report report = buildReport(dto, photoUrl);
            Report saved = repository.save(report);

            notifyReportCreated(report);

            log.info("create - Report criado com sucesso [id={}]", saved.getId());
            return URI.create("/v1/reports/" + saved.getId());

        } catch (Exception ex) {
            log.error("create - Falha ao criar report, iniciando rollback [photoUrl={}]", photoUrl, ex);
            cleanupImage(photoUrl);
            throw ex;
        }
    }

    @Transactional(readOnly = true)
    public List<Report> listAll() {
        log.info("listAll - Buscando todos os reports");
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Report getById(Long id) {
        log.info("getById - Buscando report [id={}]", id);
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("getById - Report não encontrado [id={}]", id);
                    return new ReportNotFound("Report não encontrado: " + id);
                });
    }

    @Transactional(readOnly = true)
    public List<Report> listByUserId(Long userId) {
        log.info("listByUserId - Buscando reports do usuário [userId={}]", userId);
        return repository.findAllByUserId(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateStatus(Long id, String status) {
        log.info("updateStatus - Atualizando status do report [id={}, novoStatus={}]", id, status);
        Report report = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("updateStatus - Report não encontrado [id={}]", id);
                    return new ReportNotFound("Report não encontrado: " + id);
                });

        report.setStatus(status);
        repository.save(report);
        log.info("updateStatus - Status atualizado com sucesso [id={}]", id);
    }

    @Transactional
    public void delete(Long id) {
        log.info("delete - Removendo report [id={}]", id);
        Report report = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("delete - Report não encontrado [id={}]", id);
                    return new ReportNotFound("Report não encontrado: " + id);
                });

        cleanupImage(report.getPhotoUrl());
        repository.deleteById(id);
        log.info("delete - Report removido com sucesso [id={}]", id);
    }

    private Report buildReport(ReportRequestDTO dto, String photoUrl) {
        Report report = new Report();
        report.setUserId(dto.userId());
        report.setDescription(dto.description());
        report.setCreatedAt(dto.createdAt());
        report.setLatitude(dto.latitude());
        report.setLongitude(dto.longitude());
        report.setCategory(dto.category());
        report.setProblemType(dto.problemType());
        report.setPhotoUrl(photoUrl);
        report.setStatus("PENDING");
        report.setRelevance(dto.relevance());
        return report;
    }

    private void notifyReportCreated(Report dto) {
        try {
            var event = new GamificationEventDTO(dto.getUserId(), dto.getProblemType(), dto.getCategory(), dto.getRelevance());
            gamificationClient.processReportCreated(event);
            log.debug("[{}gamification] reportCreated enviado [reportId={}, userId={}]", tag, dto.getId(), dto.getUserId());
        } catch (Exception ex) {
            log.warn("[{}gamification] Falha ao notificar criação de report", tag, ex);
        }
    }

    private String uploadPhoto(MultipartFile photo) {
        try {
            log.debug("uploadPhoto - Enviando foto (tamanho={} bytes)", photo.getSize());
            return imageClient.upload(photo);
        } catch (IOException | RestClientException e) {
            log.error("uploadPhoto - Falha ao enviar foto", e);
            throw new PhotoUploadException("Erro ao enviar imagem para o report", e);
        }
    }

    private void cleanupImage(String photoUrl) {
        if (photoUrl == null || photoUrl.isBlank()) return;
        try {
            String imageId = extractImageId(photoUrl);
            imageClient.delete(imageId);
            log.debug("cleanupImage - Imagem removida com sucesso [imageId={}]", imageId);
        } catch (Exception e) {
            log.error("cleanupImage - Falha ao remover imagem do storage [url={}]", photoUrl, e);
        }
    }

    private String extractImageId(String photoUrl) {
        if (photoUrl == null || photoUrl.isBlank()) {
            throw new ApiException("URL da imagem inválida", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        return parts[parts.length - 1];
    }
}
