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

import java.util.List;

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

        ApplicationStatus currentStatus =
                application.getApplicationStatus();

        if (currentStatus == ApplicationStatus.APPROVED ||
                currentStatus == ApplicationStatus.REJECTED) {

            throw new IllegalStateException(
                    "Application is already in final state: "
                            + currentStatus
            );
        }

        /*
         * Validate whether the requested action is allowed
         * for the current application status.
         */
        validateAction(currentStatus, request);

        /*
         * Prevent multiple pending requests for the
         * same application.
         */
        boolean pendingRequestExists =
                !requestRepository
                        .findByApplicationIdAndStatus(
                                applicationId,
                                RequestStatus.PENDING
                        )
                        .isEmpty();

        if (pendingRequestExists) {

            throw new IllegalStateException(
                    "A pending action request already exists "
                            + "for this application"
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

    private void validateAction(
            ApplicationStatus currentStatus,
            ApplicationActionRequestDto request
    ) {

        switch (currentStatus) {

            case ELIGIBILITY_VERIFIED -> {

                if (request.getAction()
                        != com.example.integration_plateform.model.ActionType.APPROVE
                        &&
                        request.getAction()
                                != com.example.integration_plateform.model.ActionType.ON_HOLD) {

                    throw new IllegalStateException(
                            "From ELIGIBILITY_VERIFIED, "
                                    + "only APPROVE or ON_HOLD "
                                    + "actions are allowed"
                    );
                }
            }

            case ON_HOLD -> {

                if (request.getAction()
                        != com.example.integration_plateform.model.ActionType.APPROVE
                        &&
                        request.getAction()
                                != com.example.integration_plateform.model.ActionType.REJECT) {

                    throw new IllegalStateException(
                            "From ON_HOLD, only APPROVE or REJECT "
                                    + "actions are allowed"
                    );
                }
            }

            case APPROVED, REJECTED -> {

                throw new IllegalStateException(
                        "Application is already in final state"
                );
            }
        }
    }

    public List<ApplicationActionRequest> getRequestsByApplicationId(String applicationId) {
        return requestRepository.findByApplicationId(applicationId);
    }
}