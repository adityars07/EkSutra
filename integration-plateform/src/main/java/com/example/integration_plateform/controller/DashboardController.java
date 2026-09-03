package com.example.integration_plateform.controller;


import com.example.integration_plateform.dto.DashboardStatusResponse;
import com.example.integration_plateform.service.DashboardService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(
        value = "api/v1/dashboard",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatusResponse getStats() {
        return dashboardService.getStats();
    }


}

