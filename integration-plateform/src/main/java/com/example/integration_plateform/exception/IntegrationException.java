package com.example.integration_plateform.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter

public class IntegrationException extends RuntimeException {
    private final String errorCode;
    private final int status;

    public IntegrationException(
            String errorCode,
            String message,
            int status){
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }

}
