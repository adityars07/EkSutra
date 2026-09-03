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

import java.util.List;
import java.util.Optional;

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

    @PatchMapping(
            value = "/{applicationId}/status",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
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
    public List<ApplicationRecord> getBySearch(@RequestParam String qurey){
        return applicationPersistenceService.searchApplication(qurey);
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
