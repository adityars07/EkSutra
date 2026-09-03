package com.example.system_a.repository;

import com.example.system_a.entity.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface systemARepository extends MongoRepository<Application,String> {

}
