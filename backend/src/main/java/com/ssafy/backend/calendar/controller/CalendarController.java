package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.service.CalendarService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping("/daily/{year}/{month}/{day}")
    public ResponseEntity<ApiResponse<?>> getDaily(
            @AuthenticationPrincipal User user,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day
    ) {
        return ResponseEntity.ok(calendarService.getDailyInfo(user, year, month, day));
    }

    @GetMapping("/bearing_period")
    public ResponseEntity<ApiResponse<?>> getBearingPeriod(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(calendarService.getBearingPeriod(user));
    }
//
    @GetMapping("/menstrual_prediction")
    public ResponseEntity<ApiResponse<?>> getMenstrualPrediction(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(calendarService.getMenstrualPrediction(user));
    }
}
