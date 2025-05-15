package com.ssafy.backend.menstrual.controller.calendar;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.service.cycle_log.MenstrualCycleLogService;
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
public class MenstrualCycleLogCalendarController {
    private final MenstrualCycleLogService menstrualCycleLogService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addMenstrualCycleDailyLog(
            @AuthenticationPrincipal User user,
            @RequestBody AddMenstrualCycleDailyLogReqDto request
            ){
        return ResponseEntity.ok(menstrualCycleLogService.addMenstrualCycleDailyLog(user,request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateMenstrualCycleDailyLog(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateMenstrualCycleDailyLogReqDto request,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(menstrualCycleLogService.updateMenstrualCycleDailyLog(user,request,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteMenstrualCycleDailyLog(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(menstrualCycleLogService.deleteMenstrualCycleDailyLog(user,id));
    }
}
