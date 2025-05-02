package com.ssafy.backend.menstrual.controller;

import com.ssafy.backend.menstrual.service.cycle_log.MenstrualCycleLogService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/calendar/menstrual_cycle/log")
@RequiredArgsConstructor
public class MenstrualCycleLogController {
    private final MenstrualCycleLogService menstrualCycleLogService;

    @PostMapping
    public ResponseEntity<MessageResDto> addMenstrualCycleDailyLog(){
        return ResponseEntity.ok(menstrualCycleLogService.addMenstrualCycleDailyLog());
    }

    @PatchMapping
    public ResponseEntity<MessageResDto> updateMenstrualCycleDailyLog(){
        return ResponseEntity.ok(menstrualCycleLogService.updateMenstrualCycleDailyLog());
    }
}
