package com.example.integration_plateform.service;

import com.example.integration_plateform.model.ApplicationRecord;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.model.StatusHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ApplicationStatusService {

    private final ApplicationPersistenceService applicationPersistenceService;

    private String getCurrentUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null) {
            return "SYSTEM";
        }

        return authentication.getName();
    }

    public ApplicationRecord updateStatus(
            String applicationId,
            ApplicationStatus newStatus,
            String reason
    ) {

        ApplicationRecord record =
                applicationPersistenceService
                        .findByApplicationId(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found: "
                                                + applicationId
                                )
                        );

        ApplicationStatus oldStatus =
                record.getApplicationStatus();

        validateTransition(oldStatus, newStatus);

        record.setApplicationStatus(newStatus);

        if (record.getStatusHistory() == null) {
            record.setStatusHistory(new ArrayList<>());
        }

        StatusHistory history =
                StatusHistory.builder()
                        .status(newStatus)
                        .reason(reason)
                        .changedBy(getCurrentUsername())
                        .changedAt(LocalDateTime.now())
                        .build();

        record.getStatusHistory().add(history);

        return applicationPersistenceService
                .saveApplication(record);
    }

    private void validateTransition(
            ApplicationStatus oldStatus,
            ApplicationStatus newStatus
    ) {

        if (oldStatus == newStatus) {
            throw new IllegalStateException(
                    "Application is already in status: " + newStatus
            );
        }

        switch (oldStatus) {

            case ELIGIBILITY_VERIFIED ->
                    validateFromEligibilityVerified(newStatus);

            case ON_HOLD ->
                    validateFromOnHold(newStatus);

            case APPROVED, REJECTED ->
                    throw new IllegalStateException(
                            "Application status is already in final state: "
                                    + oldStatus
                    );
        }
    }

    private void validateFromEligibilityVerified(
            ApplicationStatus newStatus
    ) {

        if (newStatus != ApplicationStatus.ON_HOLD &&
                newStatus != ApplicationStatus.APPROVED) {

            throw new IllegalStateException(
                    "Invalid transition from "
                            + ApplicationStatus.ELIGIBILITY_VERIFIED
                            + " to "
                            + newStatus
            );
        }
    }

    private void validateFromOnHold(
            ApplicationStatus newStatus
    ) {

        if (newStatus != ApplicationStatus.APPROVED &&
                newStatus != ApplicationStatus.REJECTED) {

            throw new IllegalStateException(
                    "Invalid transition from "
                            + ApplicationStatus.ON_HOLD
                            + " to "
                            + newStatus
            );
        }
    }
}