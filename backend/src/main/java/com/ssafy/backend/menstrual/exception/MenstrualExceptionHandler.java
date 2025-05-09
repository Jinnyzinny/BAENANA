package com.ssafy.backend.menstrual.exception;


import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.medication.exception.MedicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.backend.menstrual")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MenstrualExceptionHandler {

    @ExceptionHandler(MenstrualException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleMenstrualNotFoundException(MenstrualException e) {
        log.error("Menstrual Cycle information not found: {}", e.getMessage());
        return ApiResponse.error("MENSTRUAL_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }
}

