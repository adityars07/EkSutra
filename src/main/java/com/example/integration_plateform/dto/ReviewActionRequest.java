package com.example.integration_plateform.dto;

import com.example.integration_plateform.model.RequestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewActionRequest {

    @NotNull
    private RequestStatus decision;

    @NotBlank
    private String comment;
}