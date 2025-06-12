package br.com.pucminas.user_service.adapter.in.web.exception;

import br.com.pucminas.user_service.adpter.in.web.exception.GlobalHandlerException;
import br.com.pucminas.user_service.domain.exception.ApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class GlobalHandlerExceptionTest {

    private MockMvc mvc;

    @RestController
    static class TestController {
        @GetMapping("/api-error")
        void apiError() {
            throw new ApiException("meu erro", HttpStatus.BAD_REQUEST);
        }
        @GetMapping("/generic-error")
        void genericError() {
            throw new RuntimeException("boom");
        }
    }

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders
                .standaloneSetup(new TestController())
                .setControllerAdvice(new GlobalHandlerException())
                .build();
    }

    @Test
    void whenApiException_thenReturn400AndStandardException() throws Exception {
        mvc.perform(get("/api-error"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("meu erro"))
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.path").value("/api-error"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    void whenGenericException_thenReturn500AndMessage() throws Exception {
        mvc.perform(get("/generic-error"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message", containsString("boom")))
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.path").value("/generic-error"))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}
