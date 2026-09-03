package com.example.integration_plateform.entity;

import com.example.integration_plateform.model.ActionType;
import com.example.integration_plateform.model.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "application_action_requests")
public class ApplicationActionRequest {

    @Id
    private String id;

    private String applicationId;

    private ActionType actionType;

    private RequestStatus status;

    private String reason;

    private String requestedBy;

    private String reviewedBy;

    private String reviewComment;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime reviewedAt;
}