package com.example.system_b.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection =  "systemB-eligibility-response")
public class EligibilityResponse {

    private String requestId;
    private String citizenId;
    private Boolean eligibility;
    private String status;
}
