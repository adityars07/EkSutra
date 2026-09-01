package com.example.integration_plateform.service;

import com.example.integration_plateform.connector.SystemBConnector;
import com.example.integration_plateform.connector.SystemCConnector;
import com.example.integration_plateform.context.CorrelationContext;
import com.example.integration_plateform.dto.SystemAApplicationRequest;
import com.example.integration_plateform.mapper.ApplicationMapper;
import com.example.integration_plateform.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class IntegrationService {

    private final ApplicationMapper applicationMapper;
    private final SystemCConnector systemCConnector;
    private final SystemBConnector systemBConnector;
    private final ApplicationPersistenceService applicationPersistenceService;

    public IntegrationSystemResponse processApplication(
            SystemAApplicationRequest request) {

            // Convert system A to canonical
            CanonicalApplication canonicalApplication = applicationMapper.toCanonical(request);
            log.info("Recived system A request {} : ",request);
            log.info("Canonical application {} : ", canonicalApplication);

            // to system B request

            CanonicalEligibilityResponse systemBResponse =
                    systemBConnector.checkEligibility(canonicalApplication);
            log.info("System B response {} : ",systemBResponse);

            // Call system C
            CanonicalEligibilityResponse systemCResponse =
                    systemCConnector.checkEligibility(canonicalApplication);
            log.info("System C response {} : ",systemCResponse);

            //Convert result into Integration result
        IntegrationSystemResult systemBResult =
                IntegrationSystemResult.builder()
                        .system("SYSTEM-B")
                        .eligible(systemBResponse.isEligible())
                        .status(systemBResponse.getStatus())
                        .build();
        IntegrationSystemResult systemCResult =
                IntegrationSystemResult.builder()
                        .system("SYSTEM-C")
                        .eligible(systemCResponse.isEligible())
                        .status(systemCResponse.getStatus())
                        .build();
        List<IntegrationSystemResult> results = List.of(systemBResult, systemCResult);

        // overall eligibility
        boolean overallEligible = results.stream()
                .allMatch(IntegrationSystemResult::isEligible);

        IntegrationSystemResponse response =  IntegrationSystemResponse.builder()
                .applicationId(canonicalApplication.getApplicationId())
                .citizenId(canonicalApplication.getCitizenId())
                .correlationId(CorrelationContext.get())
                .eligible(overallEligible)
                .systems(results)
                .build();

        ApplicationRecord applicationRecord = applicationMapper.toApplicationRecord(
                canonicalApplication,
                CorrelationContext.get(),
                overallEligible,
                results
        );

        applicationPersistenceService.saveApplication(applicationRecord);

        return response;
    }
}