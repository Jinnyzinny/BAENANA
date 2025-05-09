package com.ssafy.backend.report.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.medication.service.calendar.MedicationService;
import com.ssafy.backend.medication.service.report.MedicationReportService;
import com.ssafy.backend.menstrual.service.report.MenstrualService;
import com.ssafy.backend.report.dto.response.*;
import com.ssafy.backend.report.service.ReportService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final MedicationReportService medicationReportService;
    private final ReportService reportService;
    private final MenstrualService menstrualService;

    @GetMapping("/alarm")
    public ResponseEntity<ApiResponse<?>> getAlarm(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(reportService.getAlarm(user));
    }

    @GetMapping("/menstrual/info")
    public ResponseEntity<ApiResponse<?>> getMenstrualInfo(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getMenstrualInfo(user));
    }

    @GetMapping("/menstrual/ovulation_test")
    public ResponseEntity<ApiResponse<?>> getOvulationTest(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getOvulationTest(user));
    }

    @GetMapping("/menstrual/recent")
    public ResponseEntity<ApiResponse<?>> getRecentMenstrual(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getRecentMenstrual(user));
    }

    @GetMapping("/menstrual/all")
    public ResponseEntity<ApiResponse<?>> getAllMenstrual(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getAllMenstrual(user));
    }

    @GetMapping("/medication/recent")
    public ResponseEntity<ApiResponse<?>> getRecentMedication(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(medicationReportService.getRecentMedication(user));
    }

    @GetMapping("/medication/all")
    public ResponseEntity<ApiResponse<?>> getAllMedication(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(medicationReportService.getAllMedication(user));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<?>> getSummary(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(reportService.getSummary(user));
    }
}
