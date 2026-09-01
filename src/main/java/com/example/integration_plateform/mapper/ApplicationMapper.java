package com.example.integration_plateform.mapper;

import com.example.integration_plateform.dto.*;
import com.example.integration_plateform.model.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationMapper {

    public CanonicalApplication toCanonical(SystemAApplicationRequest applicationRequest) {
         return CanonicalApplication.builder()
                .applicationId(applicationRequest.getApplicationId())
                .citizenId(applicationRequest.getBeneficiaryId())
                .applicantName(applicationRequest.getFname()+" "+applicationRequest.getLname())
                .dateOfBirth(applicationRequest.getDob())
                .schemeCode(applicationRequest.getSchemeCode())
                .build();
    }

    public SystemBEligibilityRequest toSystemB(CanonicalApplication canonicalApplication) {
        return SystemBEligibilityRequest.builder()
                .requestId(canonicalApplication.getApplicationId())
                .citizenId(canonicalApplication.getCitizenId())
                .fullName(canonicalApplication.getApplicantName())
                .dateOfBirth(canonicalApplication.getDateOfBirth())
                .scheme(canonicalApplication.getSchemeCode())
                .build();
    }

    public CanonicalEligibilityResponse systemBtoCanonical(SystemBEligibilityResponse response) {
        return CanonicalEligibilityResponse.builder()
                .requestId(response.getRequestId())
                .citizenId(response.getCitizenId())
                .eligible(response.getEligibility())
                .status(response.getStatus())
                .build();
    }
    public CanonicalEligibilityResponse systemCtoCanonical(SystemCEligibilityResponse response){
        return CanonicalEligibilityResponse.builder()
                .requestId(response.getRequestId())
                .citizenId(response.getCitizenId())
                .status(response.getStatus())
                .eligible(response.isEligible())
                .build();
    }

    public ApplicationRecord toApplicationRecord(
            CanonicalApplication canonicalApplication,
            String correlationId,
            boolean overallEligibility,
            List<IntegrationSystemResult> systems) {
        return ApplicationRecord.builder()
                .applicationId(canonicalApplication.getApplicationId())
                .citizenId(canonicalApplication.getCitizenId())
                .applicantName(canonicalApplication.getApplicantName())
                .dateOfBirth(canonicalApplication.getDateOfBirth())
                .schemeCode(canonicalApplication.getSchemeCode())
                .correlationId(correlationId)
                .overallEligibility(overallEligibility)
                .applicationStatus(
                        overallEligibility
                                ? ApplicationStatus.ELIGIBILITY_VERIFIED
                                : ApplicationStatus.REJECTED

                )
                .systems(systems)
                .build();
    }
}
