package com.example.system_c.service;

import com.example.system_c.dto.SystemCEligibilityRequest;
import com.example.system_c.dto.SystemCEligibilityResponse;
import org.springframework.stereotype.Service;

@Service
public class SystemCService {
    public SystemCEligibilityResponse checkEligibility(SystemCEligibilityRequest request){
        return new SystemCEligibilityResponse(
                request.getRequestId(),
                request.getCitizenId(),
                true,
                "VERIFIED"
        );
    }
}
