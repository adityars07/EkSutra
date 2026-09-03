package com.example.system_b.controller;


import com.example.system_b.entity.Eligibility;
import com.example.system_b.entity.EligibilityResponse;
import com.example.system_b.service.systemBService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class restController {
    private final systemBService systemBService;

    @GetMapping("/")
    public List<Eligibility> findAll() {
        return systemBService.getData();
    }
    @GetMapping("/response")
    public List<EligibilityResponse> findAllResponse() {
        return systemBService.getResponseData();
    }
    @PostMapping("/eligibility/check")
    public EligibilityResponse checkEligibility(
            @RequestBody Eligibility eligibility,
            @RequestHeader("X-Correlation-ID") String correlationId
    ) {
        System.out.println(
                "System B received correlation ID: " + correlationId
        );
        return systemBService.checkEligibility(eligibility);
    }
}
