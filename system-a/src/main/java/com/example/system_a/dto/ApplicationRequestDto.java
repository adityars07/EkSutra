package com.example.system_a.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationRequestDto {
    private String applicationId;
    private String beneficiaryId;
    private String fname;
    private String lname;
    private LocalDate dob;
    private String schemeCode;
    private boolean consentGiven;
}
