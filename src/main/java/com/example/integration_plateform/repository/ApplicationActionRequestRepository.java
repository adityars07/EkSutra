package com.example.integration_plateform.repository;

import com.example.integration_plateform.entity.ApplicationActionRequest;
import com.example.integration_plateform.model.RequestStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationActionRequestRepository  extends MongoRepository<ApplicationActionRequest, String> {

    List<ApplicationActionRequest> findByApplicationId(String applicationId);
    List<ApplicationActionRequest> findByStatus(RequestStatus status );
    List<ApplicationActionRequest> findByIdAndStatus(RequestStatus status, String applicationId);
}
