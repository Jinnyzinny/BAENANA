package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.response.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.response.GetMenstrualPredictionResDto;
import com.ssafy.backend.calendar.service.CalendarService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping("/daily/{year}/{month}/{day}")
    public ResponseEntity<?> getDaily(
            @AuthenticationPrincipal User user,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day
    ){
        return ResponseEntity.ok(calendarService.getDailyInfo(user,year,month,day));
    }

    @GetMapping("/bearing_period")
    public ResponseEntity<GetBearingPeriodResDto> getBearingPeriod(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(calendarService.getBearingPeriod(user));
    }

    @GetMapping("/menstrual_prediction")
    public ResponseEntity<GetMenstrualPredictionResDto> getMenstrualPrediction(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(calendarService.getMenstrualPrediction(user));
    }
}
