package com.example.integration_plateform.connector;

import com.example.integration_plateform.model.CanonicalApplication;
import com.example.integration_plateform.model.CanonicalEligibilityResponse;

public interface SystemCConnector  {
    public CanonicalEligibilityResponse checkEligibility(CanonicalApplication application);
}
