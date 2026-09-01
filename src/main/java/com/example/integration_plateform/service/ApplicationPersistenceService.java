package com.example.integration_plateform.service;

import com.example.integration_plateform.model.ApplicationRecord;
import com.example.integration_plateform.model.ApplicationStatus;
import com.example.integration_plateform.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicationPersistenceService {
    private final ApplicationRepository applicationRepository;

    public List<ApplicationRecord> getApplications(){
        return applicationRepository.findAll();
    }

    public ApplicationRecord saveApplication(ApplicationRecord applicationRecord) {
        return applicationRepository.save(applicationRecord);
    }

    public Optional<ApplicationRecord> findByApplicationId(String applicationId) {
        return applicationRepository.findByApplicationId(applicationId);
    }

    public List<ApplicationRecord>  searchApplication(String query){
        return applicationRepository.searchApplication(query);
    }
}
