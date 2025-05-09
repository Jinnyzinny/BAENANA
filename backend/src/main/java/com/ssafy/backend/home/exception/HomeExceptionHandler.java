package com.ssafy.backend.home.exception;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.notification.exception.NotificationNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.backend.home")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HomeExceptionHandler {

    @ExceptionHandler(HomeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleHomeNotFoundException(HomeNotFoundException e) {
        log.error("Home Message not found: {}", e.getMessage());
        return ApiResponse.error("NOTIFICATION_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }
}
