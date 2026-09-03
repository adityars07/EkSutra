package com.example.integration_plateform.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SystemBEligibilityResponse {
    private String requestId;
    private String citizenId;
    private Boolean eligibility;
    private String status;
}
