package com.example.integration_plateform.controller;

import com.example.integration_plateform.dto.ReviewActionRequest;
import com.example.integration_plateform.entity.ApplicationActionRequest;
import com.example.integration_plateform.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(
        value = "/api/v1/admin",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class AdminController {
    private final AdminService adminService;

    @PatchMapping(
            value = "/action-request/{requestId}",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ApplicationActionRequest> reviewRequest (
            @PathVariable String requestId,
            @Valid @RequestBody ReviewActionRequest reviewActionRequest
    ){
        return ResponseEntity.ok(
                adminService.reviewRequest(
                        requestId,
                        reviewActionRequest
                )
        );
    }

}
