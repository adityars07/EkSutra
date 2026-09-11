package com.example.system_a.entity;

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

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Application-system-A")
public class Application {

    @Id
    private String id;

    @Indexed(unique = true)
    private String applicationId;

    private String citizenId;
    private String applicantName;
    private String fname;
    private String lname;
    private LocalDate dob;
    private String schemeCode;

    private boolean consentGiven;
    private String status; // "RECEIVED" or "ELIGIBILITY_VERIFIED"
    private String crossSystemVerification; // "NOT_INITIATED" or "COMPLETED"
    private Boolean overallEligibility;
    private String correlationId;
    private Object systems;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
