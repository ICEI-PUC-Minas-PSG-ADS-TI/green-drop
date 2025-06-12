package br.com.puc.report_service.application.client;

import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@FeignClient(
        name = "image-service",
        url = "${image.service.url:http://localhost:8080/v1/images}",
        configuration = ImageClient.MultipartSupportConfig.class
)
public interface ImageClient {
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String upload(@RequestPart("photo") MultipartFile file) throws IOException;

    @DeleteMapping(path = "/{imageId}")
    ResponseEntity<Void> delete(@PathVariable("imageId") String imageId);

    @Configuration
    class MultipartSupportConfig {
        @Bean
        public Encoder feignFormEncoder() {
            return new SpringFormEncoder();
        }
    }
}
