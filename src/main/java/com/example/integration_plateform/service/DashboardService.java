package com.example.integration_plateform.service;


import com.example.integration_plateform.dto.DashboardStatusResponse;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ApplicationRepository applicationRepository;

    public DashboardStatusResponse getStats() {
        return DashboardStatusResponse.builder()
                .totalApplications(applicationRepository.count())
                .eligibilityVerified(
                        applicationRepository.countByApplicationStatus(
                                ApplicationStatus.ELIGIBILITY_VERIFIED
                        ))
                .onHold(
                        applicationRepository.countByApplicationStatus(
                                ApplicationStatus.ON_HOLD
                        )
                )
                .approved(
                        applicationRepository.countByApplicationStatus(
                                ApplicationStatus.APPROVED
                        )
                )
                .rejected(
                        applicationRepository.countByApplicationStatus(
                                ApplicationStatus.REJECTED
                        )
                )
                .build();
    }
}
