package br.com.pucminas.image_service.services;

import br.com.pucminas.image_service.exceptions.*;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;

import lombok.RequiredArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final GridFsTemplate gridFsTemplate;
    private final GridFSBucket gridFsBucket;
    private final Logger logger = Logger.getLogger(ImageService.class.getName());


    public URI upload(MultipartFile file) {
        logger.log(Level.INFO, "..::: INICIANDO SALVAMENTO DA IMAGEM ::: {}", file.getOriginalFilename());
        try {
            ObjectId fileId = gridFsTemplate.store(
                    file.getInputStream(),
                    file.getOriginalFilename(),
                    file.getContentType()
            );
            URI imageUrl = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(fileId)
                    .toUri();
            logger.log(Level.INFO, "..::: IMAGEM SALVA COM SUCESSO ::: {}", imageUrl);
            return imageUrl;
        } catch (IOException e) {
            logger.log(Level.SEVERE, "..::: ERRO AO SALVAR IMAGEM ::: {}", e.getMessage());
            throw new ImageUploadException("..::: FALHA AO ENVIAR IMAGEM ::: {}", e.getMessage());
        }
    }

    public String getById(String imageId) {
        logger.log(Level.INFO, "..::: INICIANDO BUSCA DA IMAGEM ::: {}", imageId);
        GridFSFile fsFile;
        try {
            fsFile = gridFsTemplate.findOne(
                    Query.query(Criteria.where("_id").is(new ObjectId(imageId)))
            );
        } catch (IllegalArgumentException e) {
            throw new ImageNotFoundException("ID de imagem inválido: " + imageId, e);
        }
        if (fsFile == null) {
            throw new ImageNotFoundException("Imagem não encontrada: " + imageId);
        }

        try (ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            gridFsBucket.downloadToStream(fsFile.getObjectId(), output);
            String contentType = fsFile.getMetadata().getString("_contentType");
            String base64Data = Base64.getEncoder().encodeToString(output.toByteArray());
            return "data:" + contentType + ";base64," + base64Data;
        } catch (Exception e) {
            throw new ImageDownloadException("Falha ao ler imagem: " + imageId, e);
        }
    }

    public void delete(String imageId) {
        try {
            gridFsTemplate.delete(
                    Query.query(Criteria.where("_id").is(new ObjectId(imageId)))
            );
        } catch (IllegalArgumentException e) {
            throw new ImageNotFoundException("ID de imagem inválido: " + imageId, e);
        } catch (Exception e) {
            throw new ImageDeletionException("Falha ao deletar imagem: " + imageId, e);
        }
    }
}
