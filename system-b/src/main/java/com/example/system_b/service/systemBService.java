package com.example.system_b.service;


import com.example.system_b.entity.EligibilityResponse;
import com.example.system_b.entity.Eligibility;
import com.example.system_b.repository.EligibilityResponseRepository;
import com.example.system_b.repository.systemBRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class systemBService {
    private final systemBRepository systemBRepository;
    private final EligibilityResponseRepository eligibilityResponseRepository;

    public List<Eligibility> getData(){
        return systemBRepository.findAll();
    }

    public List<EligibilityResponse> getResponseData(){
        return eligibilityResponseRepository.findAll();
    }

    public Eligibility setData(Eligibility eligibility){
        return systemBRepository.save(eligibility);
    }

    public EligibilityResponse checkEligibility(Eligibility eligibility){
        EligibilityResponse response = EligibilityResponse.builder()
                        .requestId(eligibility.getRequestId())
                .citizenId(eligibility.getCitizenId())
                .eligibility(true)
                .status("VERIFIED")
                .build();
        eligibilityResponseRepository.save(response);
        return response;
    }

}
