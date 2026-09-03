package com.example.integration_plateform.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class DashboardStatusResponse {
    private long totalApplications;
    private long eligibilityVerified;
    private long onHold;
    private long approved;
    private long rejected;
}
