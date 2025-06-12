package br.com.pucminas.user_service.config;

import feign.codec.Decoder;
import feign.codec.Encoder;

import feign.form.spring.SpringFormEncoder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.beans.factory.ObjectFactory;

import static org.assertj.core.api.Assertions.assertThat;

class FeignJsonConfigTest {

    @Test
    void feignEncoderBean_shouldBeSpringFormEncoder() {
        var config = new FeignJsonConfig();
        ObjectFactory<HttpMessageConverters> factory = () -> new HttpMessageConverters();
        Encoder encoder = config.feignEncoder(factory);
        assertThat(encoder).isInstanceOf(SpringFormEncoder.class);
    }

    @Test
    void feignDecoderBean_shouldBeSpringDecoder() {
        var config = new FeignJsonConfig();
        ObjectFactory<HttpMessageConverters> factory = () -> new HttpMessageConverters();
        Decoder decoder = config.feignDecoder(factory);
        assertThat(decoder).isInstanceOf(SpringDecoder.class);
    }
}
