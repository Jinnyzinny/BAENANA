package com.ssafy.backend.home.exception;

public class HomeNotFoundException extends RuntimeException {
    public HomeNotFoundException(String message) {
        super(message);
    }
}
