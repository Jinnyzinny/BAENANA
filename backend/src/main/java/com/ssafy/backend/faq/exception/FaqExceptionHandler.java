package com.ssafy.backend.faq.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import com.ssafy.backend.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;


@Slf4j
@RestControllerAdvice("com.ssafy.backend.faq") // faq 패키지에만 적용
@Order(Ordered.HIGHEST_PRECEDENCE) // 전역 예외 처리기보다 높은 우선순위 부여
public class FaqExceptionHandler {

    @ExceptionHandler(FaqNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleFaqNotFoundException(FaqNotFoundException e) {
        log.error("FAQ not found: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("FAQ_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // FAQ 관련 URL 경로에서 NoResourceFoundException 발생 시 처리
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNoResourceFoundException(NoResourceFoundException e) {
        log.error("Resource not found in FAQ context: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("FAQ_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 FAQ입니다.");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}