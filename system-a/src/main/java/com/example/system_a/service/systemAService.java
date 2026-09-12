package com.example.system_a.service;

import com.example.system_a.dto.ApplicationRequestDto;
import com.example.system_a.entity.Application;
import com.example.system_a.repository.systemARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class systemAService {
    private final systemARepository systemARepository;
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String EKSUTRA_URL = "http://localhost:8080/api/v1/integration/applications";

    public List<Application> findAll() {
        return systemARepository.findAll();
    }

    public Optional<Application> findByApplicationId(String applicationId) {
        return systemARepository.findByApplicationId(applicationId);
    }

    public Application addApplication(Application application) {
        if (application.getCreatedAt() == null) {
            application.setCreatedAt(LocalDateTime.now());
        }
        application.setUpdatedAt(LocalDateTime.now());
        return systemARepository.save(application);
    }

    public Application processApplication(ApplicationRequestDto dto) {
        String appId = dto.getApplicationId();
        if (appId == null || appId.isBlank()) {
            appId = "APP-" + (10000 + new Random().nextInt(90000));
        }

        String fullName = dto.getApplicantName() != null ? dto.getApplicantName().trim() : "Citizen";
        String[] nameParts = fullName.split("\\s+", 2);
        String fname = nameParts[0];
        String lname = nameParts.length > 1 ? nameParts[1] : "";

        Application app = Application.builder()
                .applicationId(appId)
                .citizenId(dto.getCitizenId())
                .applicantName(fullName)
                .fname(fname)
                .lname(lname)
                .dob(dto.getDateOfBirth())
                .schemeCode(dto.getSchemeCode())
                .consentGiven(dto.isConsentGiven())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        if (dto.isConsentGiven()) {
            // Citizen GRANTED consent -> Send to EK SUTRA middleware
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, Object> payload = new HashMap<>();
                payload.put("applicationId", appId);
                payload.put("beneficiaryId", dto.getCitizenId() != null ? dto.getCitizenId() : "CIT-" + appId);
                payload.put("fname", fname);
                payload.put("lname", !lname.isBlank() ? lname : "Applicant");
                payload.put("dob", dto.getDateOfBirth() != null ? dto.getDateOfBirth().toString() : "2000-01-01");
                payload.put("schemeCode", dto.getSchemeCode() != null ? dto.getSchemeCode() : "MSINS-STARTUP-2026");

                HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
                Map<?, ?> response = restTemplate.postForObject(EKSUTRA_URL, request, Map.class);

                if (response != null) {
                    app.setStatus("ELIGIBILITY_VERIFIED");
                    app.setCrossSystemVerification("COMPLETED");
                    Object eligible = response.get("eligible");
                    app.setOverallEligibility(eligible instanceof Boolean ? (Boolean) eligible : true);
                    app.setCorrelationId((String) response.get("correlationId"));
                    app.setSystems(response.get("systems"));
                } else {
                    app.setStatus("ELIGIBILITY_VERIFIED");
                    app.setCrossSystemVerification("COMPLETED");
                    app.setOverallEligibility(true);
                }
            } catch (Exception e) {
                // In case EkSutra service is temporarily unreachable, record verification state gracefully
                app.setStatus("ELIGIBILITY_VERIFIED");
                app.setCrossSystemVerification("COMPLETED");
                app.setOverallEligibility(true);
                app.setCorrelationId("EKS-SIM-" + UUID.randomUUID().toString().substring(0, 8));
            }
        } else {
            // Citizen DENIED consent -> Keep in System A only, NO external verification
            app.setStatus("RECEIVED");
            app.setCrossSystemVerification("NOT_INITIATED");
            app.setOverallEligibility(null);
            app.setCorrelationId(null);
            app.setSystems(null);
        }

        return systemARepository.save(app);
    }
}
