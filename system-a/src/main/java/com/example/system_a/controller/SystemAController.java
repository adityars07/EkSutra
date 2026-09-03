package com.example.system_a.controller;


import com.example.system_a.entity.Application;
import com.example.system_a.service.systemAService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class SystemAController {

    private final systemAService systemAService;

    @GetMapping("/applications")
    public List<Application> findAll(){
        return systemAService.findAll();
    }

    @PostMapping("/applications")
    public Application postApplication(@RequestBody Application application){
        return systemAService.addApplication(application);
    }
}
