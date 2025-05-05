package com.ssafy.backend.inquiry.exception;

import com.ssafy.backend.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice("com.ssafy.backend.inquiry") // inquiry 패키지에만 적용
@Order(Ordered.HIGHEST_PRECEDENCE) // 전역 예외 처리기보다 높은 우선순위 부여
public class InquiryExceptionHandler {

    @ExceptionHandler(InquiryNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleInquiryNotFoundException(InquiryNotFoundException e) {
        log.error("Inquiry not found: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("INQUIRY_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ForbiddenInquiryAccessException.class)
    public ResponseEntity<ApiResponse<?>> handleForbiddenInquiryAccessException(ForbiddenInquiryAccessException e) {
        log.error("Forbidden inquiry access: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("FORBIDDEN_INQUIRY_ACCESS", HttpStatus.FORBIDDEN, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InquiryAlreadyAnsweredException.class)
    public ResponseEntity<ApiResponse<?>> handleInquiryAlreadyAnsweredException(InquiryAlreadyAnsweredException e) {
        log.error("Inquiry already answered: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("INQUIRY_ALREADY_ANSWERED", HttpStatus.BAD_REQUEST, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AnswerNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleAnswerNotFoundException(AnswerNotFoundException e) {
        log.error("Answer not found: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("ANSWER_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // 문의 관련 URL 경로에서 NoResourceFoundException 발생 시 처리
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNoResourceFoundException(NoResourceFoundException e) {
        log.error("Resource not found in Inquiry context: {}", e.getMessage());
        ApiResponse<?> response = ApiResponse.error("INQUIRY_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 문의입니다.");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}