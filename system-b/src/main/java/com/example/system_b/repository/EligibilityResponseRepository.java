package com.example.system_b.repository;

import com.example.system_b.entity.EligibilityResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EligibilityResponseRepository extends MongoRepository<EligibilityResponse, String> {
}
