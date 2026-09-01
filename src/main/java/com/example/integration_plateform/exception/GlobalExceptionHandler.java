package com.example.integration_plateform.exception;


import com.example.integration_plateform.filter.CorrelationIdFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.UUID;
@Slf4j
@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException
            (MethodArgumentNotValidException exception,
             HttpServletRequest request) {

        String correlationId =
                request.getHeader(CorrelationIdFilter.CORRELATION_ID);


        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error ->
                        error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse("Request validation failed");

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(400)
                .error("VALIDATION_ERROR")
                .message(message)
                .correlationId(correlationId)
                .build();

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(IntegrationException.class)
    public ResponseEntity<ErrorResponse> handleIntegrationException(
            IntegrationException exception,
            HttpServletRequest request) {

        String correlationId =
                request.getHeader(CorrelationIdFilter.CORRELATION_ID);

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(exception.getStatus())
                .error(exception.getErrorCode())
                .message(exception.getMessage())
                .correlationId(correlationId)
                .build();

        return ResponseEntity
                .status(exception.getStatus())
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception exception, HttpServletRequest request) {

        String correlationId =
                request.getHeader(CorrelationIdFilter.CORRELATION_ID);

        log.error("Unexpected error occurred", exception);

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(500)
                .error("INTERNAL_SERVER_ERROR")
                .message("An unexpected error occurred")
                .correlationId(correlationId)
                .build();

        return ResponseEntity
                .internalServerError()
                .body(response);
    }
}
