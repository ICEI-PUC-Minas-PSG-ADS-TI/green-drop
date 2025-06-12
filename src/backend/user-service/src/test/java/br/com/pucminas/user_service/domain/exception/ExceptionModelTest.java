package br.com.pucminas.user_service.domain.exception;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class ExceptionModelTest {

    @Test
    void standardException_gettersAndSetters() {
        StandardException ex = new StandardException();
        ex.setMessage("msg");
        ex.setPath("/p");
        ex.setStatus(404);
        LocalDateTime now = LocalDateTime.now();
        ex.setTimestamp(now);

        assertThat(ex.getMessage()).isEqualTo("msg");
        assertThat(ex.getPath()).isEqualTo("/p");
        assertThat(ex.getStatus()).isEqualTo(404);
        assertThat(ex.getTimestamp()).isEqualTo(now);
    }

    @Test
    void apiException_statusIsSet() {
        ApiException api = new ApiException("e", org.springframework.http.HttpStatus.FORBIDDEN);
        assertThat(api.getStatus()).isEqualTo(org.springframework.http.HttpStatus.FORBIDDEN);
    }
}
