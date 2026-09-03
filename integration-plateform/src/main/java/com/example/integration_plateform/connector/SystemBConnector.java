package com.example.integration_plateform.connector;

import com.example.integration_plateform.dto.SystemBEligibilityRequest;
import com.example.integration_plateform.dto.SystemBEligibilityResponse;
import com.example.integration_plateform.model.CanonicalApplication;
import com.example.integration_plateform.model.CanonicalEligibilityResponse;

public interface SystemBConnector {
    public CanonicalEligibilityResponse checkEligibility(CanonicalApplication request);
}
