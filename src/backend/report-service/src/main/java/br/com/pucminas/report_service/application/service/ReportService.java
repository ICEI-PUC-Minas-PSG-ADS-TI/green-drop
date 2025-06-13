package br.com.pucminas.report_service.application.service;

import br.com.pucminas.report_service.application.client.ImageClient;
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

    @Transactional(rollbackFor = Exception.class)
    public URI create(ReportRequestDTO dto, MultipartFile photo) {
        log.info("create - iniciando criação de report [userId={}, description={}]", dto.userId(), dto.description());
        String photoUrl = null;
        try {
            log.debug("uploadPhoto - iniciando upload de foto para userId={}", dto.userId());
            photoUrl = uploadPhoto(photo);
            String imageId = extractImageId(photoUrl);
            log.debug("uploadPhoto - concluído upload [photoUrl={} (imageId={})]", photoUrl, imageId);
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

            log.debug("create - salvando report no banco [userId={}, category={}, problemType={}]",
                    dto.userId(), dto.category(), dto.problemType());
            Report saved = repository.save(report);
            log.info("create - report criado com sucesso [id={}]", saved.getId());
            return URI.create("/v1/reports/" + saved.getId());

        } catch (Exception ex) {
            log.error("create - erro durante criação de report, iniciando rollback [photoUrl={}]", photoUrl, ex);
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

    @Transactional(readOnly = true)
    public List<Report> listAll() {
        log.info("listAll - buscando todos os reports");
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Report getById(Long id) {
        log.info("getById - buscando report id={}", id);
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("getById - report não encontrado id={}", id);
                    return new ReportNotFound("REPORT NÃO ENCONTRADO ::: " + id);
                });
    }

    @Transactional(readOnly = true)
    public List<Report> listByUserId(Long userId) {
        log.info("listByUserId - buscando reports do usuário id={}", userId);
        return repository.findAllByUserId(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateStatus(Long id,  String status) {
        log.info("updateStatus - iniciando atualização de status do report id={} para {}", id, status);
        Report existing = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("updateStatus - report não encontrado id={}", id);
                    return new ReportNotFound("REPORT NÃO ENCONTRADO ::: " + id);
                });
        existing.setStatus(status);
        repository.save(existing);
        log.info("updateStatus - status atualizado com sucesso id={}", id);
    }

    @Transactional
    public void delete(Long id) {
        log.info("delete - iniciando remoção de report id={}", id);
        Report existing = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("delete - report não encontrado id={}", id);
                    return new ReportNotFound("REPORT NÃO ENCONTRADO ::: " + id);
                });
        try {
            String imageId = extractImageId(existing.getPhotoUrl());
            imageClient.delete(imageId);
            log.debug("delete - imagem {} deletada", imageId);
        } catch (RestClientException e) {
            log.error("delete - falha ao remover foto do storage para report id={}", id, e);
            throw new ApiException("FALHA AO DELETAR FOTO DO REPORT ::: " + id, HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
        repository.deleteById(id);
        log.info("delete - report id={} deletado com sucesso", id);
    }

    private String uploadPhoto(MultipartFile photo) {
        log.debug("uploadPhoto - iniciando upload de foto (tamanho={} bytes)", photo.getSize());
        try {
            String url = imageClient.upload(photo);
            log.debug("uploadPhoto - upload concluído, url={}", url);
            return url;
        } catch (IOException | RestClientException e) {
            log.error("uploadPhoto - erro ao enviar foto", e);
            throw new PhotoUploadException("FALHA AO ENVIAR FOTO DO REPORT ::: ", e);
        }
    }

    private String extractImageId(String photoUrl) {
        log.trace("extractImageId - photoUrl={}", photoUrl);
        if (photoUrl == null || photoUrl.isBlank()) {
            log.error("extractImageId - URL da foto inválida");
            throw new ApiException("URL DA FOTO INVÁLIDA PARA O REPORT ::: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String[] parts = photoUrl.split("/");
        String imageId = parts[parts.length - 1];
        log.trace("extractImageId - imageId={}", imageId);
        return imageId;
    }
}
