package com.example.system_c.Controller;

import com.example.system_c.dto.SystemCEligibilityRequest;
import com.example.system_c.dto.SystemCEligibilityResponse;
import com.example.system_c.service.SystemCService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/legacy/api")
public class SystemCController {
    private final SystemCService systemCService;
    @PostMapping(
            value = "/eligibility",
            consumes = MediaType.APPLICATION_XML_VALUE,
            produces = MediaType.APPLICATION_XML_VALUE
    )
    public SystemCEligibilityResponse checkEligibility(
            @RequestBody SystemCEligibilityRequest request) {

        return systemCService.checkEligibility(request);
    }
}
