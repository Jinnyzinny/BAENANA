package com.ssafy.backend.common.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfig {

    /**
     * RAG 서비스 통신용 RestTemplate
     * 이름을 지정하여 다른 RestTemplate과 구분
     */
    @Bean(name = "ragRestTemplate")
    public RestTemplate ragRestTemplate() {
        return new RestTemplateBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .readTimeout(Duration.ofSeconds(30))
                .build();
    }

    /**
     * 기본 RestTemplate
     * 다른 곳에서 일반적으로 사용할 기본 RestTemplate 빈
     */
    @Bean
    @Primary
    public RestTemplate defaultRestTemplate() {
        return new RestTemplate();
    }
}