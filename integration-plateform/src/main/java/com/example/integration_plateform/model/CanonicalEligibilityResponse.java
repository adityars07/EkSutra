package com.example.integration_plateform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CanonicalEligibilityResponse {
    private String requestId;
    private String citizenId;
    private boolean eligible;
    private String status;
}
