package com.ssafy.backend.notification.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.ssafy.backend.common.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice("com.ssafy.backend.notification") // notification 패키지에만 적용
@Order(Ordered.HIGHEST_PRECEDENCE) // 전역 예외 처리기보다 높은 우선순위 부여
public class NotificationExceptionHandler {

    @ExceptionHandler(NotificationNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleNotificationNotFoundException(NotificationNotFoundException e) {
        log.error("Notification not found: {}", e.getMessage());
        return ApiResponse.error("NOTIFICATION_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }

    // notification 관련 URL 경로에서 NoResourceFoundException 발생 시 처리
    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleNoResourceFoundException(NoResourceFoundException e) {
        log.error("Resource not found in notification context: {}", e.getMessage());
        return ApiResponse.error("NOTIFICATION_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 공지사항입니다.");
    }
}