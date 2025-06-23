package br.com.pucminas.gamification_service.application.client;



import br.com.pucminas.gamification_service.config.FeignJsonConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-service", url = "${image.service.url:http://localhost:8080/v1/users}", configuration = FeignJsonConfig.class)
public interface UserServiceClient {
    @PatchMapping(value = "/{id}/points", params = "delta")
    void adjustPoints(@PathVariable("id") Long id, @RequestParam int delta);
}

