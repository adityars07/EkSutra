package com.example.integration_plateform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class StatusHistory {
    private ApplicationStatus status;
    private String reason ;
    private String changedBy;
    private LocalDateTime changedAt;
}

