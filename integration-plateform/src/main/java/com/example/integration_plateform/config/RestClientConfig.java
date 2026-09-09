package com.example.integration_plateform.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Value("${system.b.url}")
    private String systemBUrl;

    @Value("${system.c.url}")
    private String systemCUrl;

    @Bean
    public RestClient systemBRestClient() {
        return RestClient.builder()
                .baseUrl(systemBUrl)
                .build();
    }

    @Bean
    public RestClient systemCRestClient() {
        return RestClient.builder()
                .baseUrl(systemCUrl)
                .build();
    }
}