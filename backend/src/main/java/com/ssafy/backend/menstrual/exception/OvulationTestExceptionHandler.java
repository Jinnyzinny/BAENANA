package com.ssafy.backend.menstrual.exception;

import com.ssafy.backend.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.backend.menstrual")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class OvulationTestExceptionHandler {
    @ExceptionHandler(OvulationTestException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleOvulationTestNotFoundException(OvulationTestException e) {
        log.error("Menstrual Cycle information not found: {}", e.getMessage());
        return ApiResponse.error("OVULATION_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(OvulationTestStandardException.class)  // 수정: 올바른 예외 타입으로 변경
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleNoMatchedOvulationTestException(OvulationTestStandardException e) {
        log.error("Not Matched Ovulation Test Standard: {}", e.getMessage());
        return ApiResponse.error("MENSTRUAL_AND_STANDARD_NOT_MATCHED", HttpStatus.NOT_FOUND, e.getMessage());
    }
}
