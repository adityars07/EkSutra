package com.example.integration_plateform.controller;

import com.example.integration_plateform.dto.ApplicationActionRequestDto;
import com.example.integration_plateform.dto.UpdateApplicationStatusRequest;
import com.example.integration_plateform.entity.ApplicationActionRequest;
import com.example.integration_plateform.model.ApplicationRecord;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.service.ApplicationActionRequestService;
import com.example.integration_plateform.service.ApplicationPersistenceService;
import com.example.integration_plateform.service.ApplicationStatusService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.integration_plateform.model.StatusHistory;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(
        value="/api/v1/applications",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class ApplicationController {
    private final ApplicationPersistenceService applicationPersistenceService;
    private final ApplicationStatusService applicationStatusService;
    private final ApplicationActionRequestService applicationActionRequestService;

    @GetMapping
    List<ApplicationRecord> getApplication(){
        return applicationPersistenceService.getApplications();
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<ApplicationRecord> getApplicationById(@PathVariable String applicationId){
        return ResponseEntity.of(applicationPersistenceService.findByApplicationId(applicationId));
    }

    @GetMapping("/{applicationId}/status")
    public ResponseEntity<Map<String, Object>> getApplicationStatus(@PathVariable String applicationId) {
        return applicationPersistenceService.findByApplicationId(applicationId)
                .map(app -> ResponseEntity.ok(Map.<String, Object>of(
                        "applicationId", app.getApplicationId(),
                        "status", app.getApplicationStatus(),
                        "updatedAt", app.getUpdatedAt() != null ? app.getUpdatedAt().toString() : (app.getCreatedAt() != null ? app.getCreatedAt().toString() : "")
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/status-history")
    public ResponseEntity<List<StatusHistory>> getStatusHistory(@PathVariable String applicationId) {
        return applicationPersistenceService.findByApplicationId(applicationId)
                .map(app -> ResponseEntity.ok(app.getStatusHistory() != null ? app.getStatusHistory() : List.<StatusHistory>of()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/action-requests")
    public List<ApplicationActionRequest> getActionRequestsByApplicationId(@PathVariable String applicationId) {
        return applicationActionRequestService.getRequestsByApplicationId(applicationId);
    }

    @PatchMapping(
            value = "/{applicationId}/status",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationRecord> updateApplicationStatus(
            @PathVariable String applicationId,
            @Valid @RequestBody UpdateApplicationStatusRequest request
    ) {

        return ResponseEntity.ok(
                applicationStatusService.updateStatus(
                        applicationId,
                        request.getStatus(),
                        request.getReason()
                )
        );
    }

    @GetMapping("/search")
    public List<ApplicationRecord> getBySearch(@RequestParam String query){
        return applicationPersistenceService.searchApplication(query);
    }

    @PostMapping(
            value = "/{applicationId}/action-requests",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasRole('AUTHORITY')")
    public ResponseEntity<ApplicationActionRequest> createActionRequest(
            @PathVariable String applicationId,
            @Valid @RequestBody ApplicationActionRequestDto request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        applicationActionRequestService
                                .createRequest(
                                        applicationId,
                                        request
                                )
                );
    }
}
