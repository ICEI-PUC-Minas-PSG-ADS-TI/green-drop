package br.com.pucminas.user_service.config;

import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

class ApplicationConfigTest {

    @Test
    void passwordEncoderBean_shouldBeBCrypt() {
        try (var ctx = new AnnotationConfigApplicationContext(ApplicationConfig.class)) {
            PasswordEncoder encoder = ctx.getBean(PasswordEncoder.class);
            assertThat(encoder).isInstanceOf(BCryptPasswordEncoder.class);
        }
    }
}
