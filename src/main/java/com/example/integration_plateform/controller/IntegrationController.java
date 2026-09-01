package com.example.integration_plateform.controller;

import com.example.integration_plateform.dto.SystemAApplicationRequest;
import com.example.integration_plateform.model.CanonicalEligibilityResponse;
import com.example.integration_plateform.model.IntegrationSystemResponse;
import com.example.integration_plateform.service.IntegrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/integration")
public class IntegrationController {

    private final IntegrationService integrationService;

    @PostMapping("/applications")
    public IntegrationSystemResponse checkEligibility(
            @RequestBody @Valid SystemAApplicationRequest systemAApplicationRequest) {
        return integrationService.processApplication(systemAApplicationRequest);
    }
}