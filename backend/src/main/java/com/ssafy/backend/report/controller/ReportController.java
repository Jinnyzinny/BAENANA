package com.ssafy.backend.report.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.medication.service.report.MedicationReportService;
import com.ssafy.backend.menstrual.service.report.MenstrualService;
import com.ssafy.backend.report.dto.request.AddOvulationTestReqDto;
import com.ssafy.backend.report.service.ReportService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/alarm")
    public ResponseEntity<ApiResponse<?>> getAlarm(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(reportService.getAlarm(user));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<?>> getSummary(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(reportService.getSummary(user));
    }
}
