package com.example.system_a.controller;

import com.example.system_a.dto.ApplicationRequestDto;
import com.example.system_a.entity.Application;
import com.example.system_a.service.systemAService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class SystemAController {

    private final systemAService systemAService;

    @GetMapping("/applications")
    public List<Application> findAll() {
        return systemAService.findAll();
    }

    @GetMapping("/applications/{applicationId}")
    public ResponseEntity<Application> findById(@PathVariable String applicationId) {
        return systemAService.findByApplicationId(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping({"/application", "/applications"})
    public ResponseEntity<Application> postApplication(@RequestBody ApplicationRequestDto request) {
        Application created = systemAService.processApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
