package com.example.integration_plateform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IntegrationSystemResponse {
    private String applicationId;
    private String citizenId;
    private String correlationId;
    private boolean eligible;
    private List<IntegrationSystemResult> systems;
}
