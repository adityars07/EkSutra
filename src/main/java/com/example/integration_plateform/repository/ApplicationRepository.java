package com.example.integration_plateform.repository;

import com.example.integration_plateform.model.ApplicationRecord;
import com.example.integration_plateform.model.ApplicationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends MongoRepository<ApplicationRecord, String> {
    Optional<ApplicationRecord> findByApplicationId(String applicationId);
    long countByApplicationStatus(ApplicationStatus applicationStatus);
    long countByApplicationStatusIn(List<ApplicationStatus> applicationStatuses);

    @Query("""
{
    "$or": [
        { "applicationId": { "$regex": ?0, "$options": "i" } },
        { "citizenId": { "$regex": ?0, "$options": "i" } },
        { "applicantName": { "$regex": ?0, "$options": "i" } }
    ]
}
""")
    List<ApplicationRecord> searchApplication(String query);
}
