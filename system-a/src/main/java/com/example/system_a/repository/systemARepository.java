package com.example.system_a.repository;

import com.example.system_a.entity.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface systemARepository extends MongoRepository<Application, String> {
    Optional<Application> findByApplicationId(String applicationId);
    Optional<Application> findByCitizenId(String citizenId);
}
