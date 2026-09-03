package com.example.integration_plateform.dto;


import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SystemBEligibilityRequest {
    private String requestId;
    private String citizenId;
    private String fullName;
    private LocalDate dateOfBirth;
    private String scheme;
}
