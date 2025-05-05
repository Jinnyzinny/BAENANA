package com.ssafy.backend.menstrual.controller;

import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.service.cycle_log.MenstrualCycleLogService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/calendar/menstrual_cycle/log")
@RequiredArgsConstructor
public class MenstrualCycleLogController {
    private final MenstrualCycleLogService menstrualCycleLogService;

    @PostMapping
    public ResponseEntity<MessageResDto> addMenstrualCycleDailyLog(
            @AuthenticationPrincipal User user,
            @RequestBody AddMenstrualCycleDailyLogReqDto request
            ){
        return ResponseEntity.ok(menstrualCycleLogService.addMenstrualCycleDailyLog(user,request));
    }

    @PatchMapping
    public ResponseEntity<MessageResDto> updateMenstrualCycleDailyLog(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateMenstrualCycleDailyLogReqDto request
    ){
        return ResponseEntity.ok(menstrualCycleLogService.updateMenstrualCycleDailyLog(user,request));
    }
}
