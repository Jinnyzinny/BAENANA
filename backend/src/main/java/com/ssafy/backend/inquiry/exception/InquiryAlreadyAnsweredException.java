package com.ssafy.backend.inquiry.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InquiryAlreadyAnsweredException extends RuntimeException {
    public InquiryAlreadyAnsweredException(String message) {
        super(message);
    }
}