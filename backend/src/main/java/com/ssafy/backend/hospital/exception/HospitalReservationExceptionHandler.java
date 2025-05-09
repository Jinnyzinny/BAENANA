package com.ssafy.backend.hospital.exception;

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
@RestControllerAdvice(basePackages = "com.ssafy.backend.hospital")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HospitalReservationExceptionHandler {

    @ExceptionHandler(HospitalReservationException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleHospitalReservationNotFoundException(HospitalReservationException e) {
        log.error("Hospital Reservation not found: {}", e.getMessage());
        return ApiResponse.error("HOSPITAL_RESERVATION_NOT_FOUND", HttpStatus.NOT_FOUND, e.getMessage());
    }
}
