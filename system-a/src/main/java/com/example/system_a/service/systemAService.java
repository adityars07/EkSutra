package com.example.system_a.service;

import com.example.system_a.entity.Application;
import com.example.system_a.repository.systemARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class systemAService {
    private final systemARepository systemARepository;

    public List<Application> findAll(){
        return systemARepository.findAll();
    }

    public Application addApplication(Application application){
        return systemARepository.save(application);
    }
}
