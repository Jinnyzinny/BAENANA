package com.ssafy.backend.inquiry.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenInquiryAccessException extends RuntimeException {
    public ForbiddenInquiryAccessException(String message) {
        super(message);
    }
}