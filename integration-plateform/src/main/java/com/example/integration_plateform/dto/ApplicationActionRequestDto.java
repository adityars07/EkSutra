package com.example.integration_plateform.dto;

import com.example.integration_plateform.model.ActionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationActionRequestDto {

    @NotNull(message = "Action is required")
    private ActionType action;

    @NotBlank(message = "Reason is required")
    private String reason;
}