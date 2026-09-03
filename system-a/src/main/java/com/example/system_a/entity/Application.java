package com.example.system_a.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Application-system-A")
public class Application {

    @Id
    private String id;

    private String applicationId;
    private String fname;
    private String lname;
    private LocalDate dob;
    private String schemeCode;
}
