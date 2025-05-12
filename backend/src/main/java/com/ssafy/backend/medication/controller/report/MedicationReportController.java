package com.ssafy.backend.medication.controller.report;

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
@RequestMapping("/api/report/medication")
@RequiredArgsConstructor
public class MedicationReportController {
    private final MedicationReportService medicationReportService;

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<?>> getRecentMedication(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(medicationReportService.getRecentMedication(user));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<?>> getAllMedication(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(medicationReportService.getAllMedication(user));
    }
}
