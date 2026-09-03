package com.example.system_b.repository;

import com.example.system_b.entity.Eligibility;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface systemBRepository extends MongoRepository<Eligibility, String> {
}
