//package com.example.integration_plateform.service;
//
//import com.example.integration_plateform.dto.ReviewActionRequest;
//import com.example.integration_plateform.entity.ApplicationActionRequest;
//import com.example.integration_plateform.model.ActionType;
//import com.example.integration_plateform.model.ApplicationStatus;
//import com.example.integration_plateform.model.RequestStatus;
//import com.example.integration_plateform.repository.ApplicationActionRequestRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service
//@RequiredArgsConstructor
//public class AdminService {
//
//    private final ApplicationActionRequestRepository requestRepository;
//    private final ApplicationActionRequestService requestService;
//    public ApplicationActionRequest reviewRequest(
//            String requestId,
//            ReviewActionRequest review
//    ) {
//
//        ApplicationActionRequest actionRequest =
//                requestRepository
//                        .findById(requestId)
//                        .orElseThrow(...);
//
//        if (actionRequest.getStatus() != RequestStatus.PENDING) {
//            throw new IllegalStateException(
//                    "Request has already been reviewed"
//            );
//        }
//
//        String admin =
//                SecurityContextHolder
//                        .getContext()
//                        .getAuthentication()
//                        .getName();
//
//        actionRequest.setStatus(review.getDecision());
//        actionRequest.setReviewedBy(admin);
//        actionRequest.setReviewComment(review.getComment());
//        actionRequest.setReviewedAt(LocalDateTime.now());
//
//        if (review.getDecision() == RequestStatus.APPROVED) {
//
//            ApplicationStatus newStatus =
//                    actionRequest.getActionType()
//                            == ActionType.APPROVE
//                            ? ApplicationStatus.APPROVED
//                            : ApplicationStatus.REJECTED;
//
//            applicationStatusService.updateStatus(
//                    actionRequest.getApplicationId(),
//                    newStatus,
//                    review.getComment()
//            );
//        }
//        return requestRepository.save(actionRequest);
//    }
//}
