package com.example.integration_plateform.dto;


import com.example.integration_plateform.model.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateApplicationStatusRequest {
    @NotNull
    private ApplicationStatus status;

    @NotBlank
    private String reason;
}
