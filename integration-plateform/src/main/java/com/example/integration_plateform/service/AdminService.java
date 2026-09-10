package com.example.integration_plateform.service;

import com.example.integration_plateform.dto.ReviewActionRequest;
import com.example.integration_plateform.entity.ApplicationActionRequest;
import com.example.integration_plateform.model.ActionType;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.model.RequestStatus;
import com.example.integration_plateform.repository.ApplicationActionRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ApplicationActionRequestRepository requestRepository;
    private final ApplicationStatusService applicationStatusService;

    public ApplicationActionRequest reviewRequest(
            String requestId,
            ReviewActionRequest review
    ) {

        ApplicationActionRequest actionRequest =
                requestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Action request not found: "
                                                + requestId
                                )
                        );

        /*
         * Only PENDING requests can be reviewed.
         */
        if (actionRequest.getStatus()
                != RequestStatus.PENDING) {

            throw new IllegalStateException(
                    "Request has already been reviewed"
            );
        }

        /*
         * Prevent the same person who created the request
         * from reviewing it.
         */
        String admin =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        if (admin.equals(actionRequest.getRequestedBy())) {

            throw new IllegalStateException(
                    "The requester cannot review their own request"
            );
        }

        /*
         * If admin REJECTS the action request,
         * the application status does NOT change.
         */
        if (review.getDecision()
                == RequestStatus.REJECTED) {

            actionRequest.setStatus(
                    RequestStatus.REJECTED
            );

            actionRequest.setReviewedBy(admin);

            actionRequest.setReviewComment(
                    review.getComment()
            );

            actionRequest.setReviewedAt(
                    LocalDateTime.now()
            );

            return requestRepository.save(actionRequest);
        }

        /*
         * If admin APPROVES the action request,
         * determine the actual application status.
         */
        ApplicationStatus newStatus =
                switch (actionRequest.getActionType()) {

                    case APPROVE ->
                            ApplicationStatus.APPROVED;

                    case REJECT ->
                            ApplicationStatus.REJECTED;

                    case ON_HOLD ->
                            ApplicationStatus.ON_HOLD;
                };

        /*
         * Change application status.
         *
         * This also creates StatusHistory.
         */
        applicationStatusService.updateStatus(
                actionRequest.getApplicationId(),
                newStatus,
                review.getComment()
        );

        /*
         * Mark action request as approved.
         */
        actionRequest.setStatus(
                RequestStatus.APPROVED
        );

        actionRequest.setReviewedBy(admin);

        actionRequest.setReviewComment(
                review.getComment()
        );

        actionRequest.setReviewedAt(
                LocalDateTime.now()
        );

        return requestRepository.save(actionRequest);
    }
}