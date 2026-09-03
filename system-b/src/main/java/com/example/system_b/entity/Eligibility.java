package com.example.system_b.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document (collection = "systemB-eligibility")
public class Eligibility {

    @Id
    private String id;

    private String requestId;
    private String citizenId;
    private String fullName;
    private String dateOfBirth;
    private String scheme;
}
