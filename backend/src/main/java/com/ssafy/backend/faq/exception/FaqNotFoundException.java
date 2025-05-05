package com.ssafy.backend.faq.exception;

public class FaqNotFoundException extends RuntimeException {
    public FaqNotFoundException(String message) {
        super(message);
    }
}