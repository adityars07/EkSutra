package com.example.integration_plateform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CanonicalApplication {
    private String applicationId;
    private String citizenId;
    private String applicantName;
    private LocalDate dateOfBirth;
    private String schemeCode;
}
