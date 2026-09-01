package com.example.integration_plateform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "application")
public class ApplicationRecord {
    @Id
    private String id;
    @Indexed(unique = true)
    private String applicationId;

    private String citizenId;
    private String applicantName;
    private LocalDate dateOfBirth;
    private String schemeCode;
    private String correlationId;
    private boolean overallEligibility;
    private ApplicationStatus applicationStatus;
    private List<IntegrationSystemResult> systems;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    private List<StatusHistory> statusHistory;
}
