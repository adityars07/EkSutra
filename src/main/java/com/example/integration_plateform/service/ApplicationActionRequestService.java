package com.example.integration_plateform.service;

import com.example.integration_plateform.dto.ApplicationActionRequestDto;
import com.example.integration_plateform.entity.ApplicationActionRequest;
import com.example.integration_plateform.model.ApplicationRecord;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.model.RequestStatus;
import com.example.integration_plateform.repository.ApplicationActionRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationActionRequestService {

    private final ApplicationActionRequestRepository requestRepository;
    private final ApplicationPersistenceService applicationPersistenceService;

    public ApplicationActionRequest createRequest(
            String applicationId,
            ApplicationActionRequestDto request
    ) {

        ApplicationRecord application =
                applicationPersistenceService
                        .findByApplicationId(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found: "
                                                + applicationId
                                )
                        );

        if (application.getApplicationStatus()
                == ApplicationStatus.APPROVED ||
                application.getApplicationStatus()
                        == ApplicationStatus.REJECTED) {

            throw new IllegalStateException(
                    "Application is already in final state"
            );
        }

        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        ApplicationActionRequest actionRequest =
                ApplicationActionRequest.builder()
                        .applicationId(applicationId)
                        .actionType(request.getAction())
                        .status(RequestStatus.PENDING)
                        .reason(request.getReason())
                        .requestedBy(username)
                        .build();

        return requestRepository.save(actionRequest);
    }
}