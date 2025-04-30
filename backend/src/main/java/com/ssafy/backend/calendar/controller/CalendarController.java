package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.resDto.calendar.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.resDto.calendar.GetMenstrualPredictionResDto;
import com.ssafy.backend.calendar.service.calendar.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping("/bearing_period")
    public ResponseEntity<GetBearingPeriodResDto> getBearingPeriod() {
        return ResponseEntity.ok(calendarService.getBearingPeriod());
    }

    @GetMapping("/menstrual_prediction")
    public ResponseEntity<GetMenstrualPredictionResDto> getMenstrualPrediction() {
        return ResponseEntity.ok(calendarService.getMenstrualPrediction());
    }
}
