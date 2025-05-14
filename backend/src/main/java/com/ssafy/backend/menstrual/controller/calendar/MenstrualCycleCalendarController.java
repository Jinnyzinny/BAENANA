package com.ssafy.backend.menstrual.controller.calendar;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.service.cycle.CycleService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/calendar/menstrual_cycle")
@RequiredArgsConstructor
public class MenstrualCycleCalendarController {
    private final CycleService cycleService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addMenstrualCycle(
            @AuthenticationPrincipal User user,
            @RequestBody AddMenstrualCycleReqDto request
    ) {
        return ResponseEntity.ok(cycleService.addMenstrualCycle(user, request));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMenstrualCycle(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(cycleService.getMenstrualCycle(user));
    }

    @PatchMapping("/{cycle_id}")
    public ResponseEntity<ApiResponse<?>> updateMenstrualCycle(
            @RequestBody UpdateMenstrualCycleReqDto request,
            @PathVariable Long cycle_id
    ) {
        return ResponseEntity.ok(cycleService.updateMenstrualCycle(request, cycle_id));
    }
}
