package com.ssafy.backend.menstrual.controller.report;
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
@RequestMapping("/api/report/menstrual")
@RequiredArgsConstructor
public class MenstrualCycleReportController {
    private final MenstrualService menstrualService;

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<?>> getMenstrualInfo(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getMenstrualInfo(user));
    }

    @PostMapping("/ovulation_test")
    public ResponseEntity<ApiResponse<?>> addOvulationTest(
            @RequestBody AddOvulationTestReqDto request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.addOvulationTest(user,request));
    }

    @GetMapping("/ovulation_test")
    public ResponseEntity<ApiResponse<?>> getOvulationTest(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getOvulationTest(user));
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<?>> getRecentMenstrual(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getRecentMenstrual(user));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<?>> getAllMenstrual(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(menstrualService.getAllMenstrual(user));
    }
}
