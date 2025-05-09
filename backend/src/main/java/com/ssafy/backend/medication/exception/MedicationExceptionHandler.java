package com.ssafy.backend.medication.exception;

import com.ssafy.backend.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.backend.medication")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MedicationExceptionHandler {

    @ExceptionHandler(MedicationException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleMedicationNotFoundException(MedicationException e) {
        log.error("Medication not found: {}", e.getMessage());
        return ApiResponse.error("MEDICATION_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }
}

