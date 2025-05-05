package com.ssafy.backend.faq.exception;

public class FaqForbiddenException extends RuntimeException {
    public FaqForbiddenException(String message) {
        super(message);
    }
}