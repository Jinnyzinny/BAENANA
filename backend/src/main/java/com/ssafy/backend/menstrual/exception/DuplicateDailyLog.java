package com.ssafy.backend.menstrual.exception;

public class DuplicateDailyLog extends RuntimeException {
    public DuplicateDailyLog(String message) {
        super(message);
    }
}
