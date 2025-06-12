package br.com.pucminas.image_service.application.service;

import br.com.pucminas.image_service.domain.exception.ImageDeletionException;
import br.com.pucminas.image_service.domain.exception.ImageDownloadException;
import br.com.pucminas.image_service.domain.exception.ImageNotFoundException;
import br.com.pucminas.image_service.domain.exception.ImageUploadException;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.Base64;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    @Value("${app.gateway.base-url}")
    private String gatewayBaseUrl;
    private final GridFsTemplate gridFsTemplate;
    private final GridFSBucket gridFsBucket;

    public String upload(MultipartFile file) {
        log.info("upload - iniciando salvamento da imagem: originalFilename='{}', contentType='{}', size={} bytes",
                file.getOriginalFilename(), file.getContentType(), file.getSize());
        try {
            ObjectId fileId = gridFsTemplate.store(
                    file.getInputStream(),
                    file.getOriginalFilename(),
                    file.getContentType()
            );
            String idHex = fileId.toHexString();
            URI imageUrl = UriComponentsBuilder
                    .fromHttpUrl(gatewayBaseUrl)
                    .path("/v1/images/{id}")
                    .buildAndExpand(idHex)
                    .toUri();

            log.info("upload - imagem salva com sucesso: imageId='{}', url='{}'", idHex, imageUrl);
            return imageUrl.toString();

        } catch (IOException e) {
            log.error("upload - falha ao ler stream do arquivo '{}'", file.getOriginalFilename(), e);
            throw new ImageUploadException(
                    "Falha ao enviar imagem: " + file.getOriginalFilename(), e
            );
        } catch (Exception e) {
            log.error("upload - erro inesperado ao salvar imagem '{}'", file.getOriginalFilename(), e);
            throw new ImageUploadException(
                    "Erro inesperado ao salvar imagem: " + file.getOriginalFilename(), e
            );
        }
    }

    public String getById(String imageId) {
        log.info("getById - iniciando busca da imagem id='{}'", imageId);

        ObjectId objId;
        try {
            objId = new ObjectId(imageId);
        } catch (IllegalArgumentException e) {
            log.warn("getById - ID de imagem inválido: '{}'", imageId, e);
            throw new ImageNotFoundException("ID de imagem inválido: " + imageId, e);
        }

        GridFSFile fsFile = gridFsTemplate.findOne(
                Query.query(Criteria.where("_id").is(objId))
        );
        if (fsFile == null) {
            log.warn("getById - nenhuma imagem encontrada para id='{}'", imageId);
            throw new ImageNotFoundException("Imagem não encontrada: " + imageId);
        }

        try (ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            gridFsBucket.downloadToStream(fsFile.getObjectId(), output);
            byte[] data = output.toByteArray();
            String contentType = fsFile.getMetadata().getString("_contentType");
            String base64 = Base64.getEncoder().encodeToString(data);

            log.info("getById - download concluído: id='{}', size={} bytes, contentType='{}'",
                    imageId, data.length, contentType);

            return "data:" + contentType + ";base64," + base64;

        } catch (IOException e) {
            log.error("getById - falha ao ler bytes da imagem id='{}'", imageId, e);
            throw new ImageDownloadException("Falha ao ler imagem: " + imageId, e);
        } catch (Exception e) {
            log.error("getById - erro inesperado ao baixar imagem id='{}'", imageId, e);
            throw new ImageDownloadException("Erro ao baixar imagem: " + imageId, e);
        }
    }

    public void delete(String imageId) {
        log.info("delete - iniciando remoção da imagem id='{}'", imageId);

        ObjectId objId;
        try {
            objId = new ObjectId(imageId);
        } catch (IllegalArgumentException e) {
            log.warn("delete - ID de imagem inválido: '{}'", imageId, e);
            throw new ImageNotFoundException("ID de imagem inválido: " + imageId, e);
        }

        try {
            gridFsTemplate.delete(Query.query(Criteria.where("_id").is(objId)));
            log.info("delete - imagem removida com sucesso id='{}'", imageId);
        } catch (Exception e) {
            log.error("delete - falha ao deletar imagem id='{}'", imageId, e);
            throw new ImageDeletionException("Falha ao deletar imagem: " + imageId, e);
        }
    }
}
