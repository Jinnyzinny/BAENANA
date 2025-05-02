package com.ssafy.backend.report.controller;

import com.ssafy.backend.report.dto.response.*;
import com.ssafy.backend.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/alarm")
    public ResponseEntity<GetAlarmResDto> getAlarm() {
        return ResponseEntity.ok(reportService.getAlarm());
    }

    @GetMapping("/menstrual/info")
    public ResponseEntity<GetMenstrualResDto> getMenstrual() {
        return ResponseEntity.ok(reportService.getMenstrual());
    }

    @GetMapping("/menstrual/ovulation_test")
    public ResponseEntity<GetOvulationTestResDto> getOvulationTest() {
        return ResponseEntity.ok(reportService.getOvulationTest());
    }

    @GetMapping("/menstrual/recent")
    public ResponseEntity<List<GetRecentMenstrualResDto>> getRecentMenstrual() {
        return ResponseEntity.ok(reportService.getRecentMenstrual());
    }
    @GetMapping("/menstrual/all")
    public ResponseEntity<List<GetMenstrualResDto>> getAllMenstrual() {
        return ResponseEntity.ok(reportService.getMenstrual());
    }

    @GetMapping("/medication/recent")
    public ResponseEntity<GetRecentMedicationResDto> getRecentMedication() {
        return ResponseEntity.ok(reportService.getRecentMedication());
    }

    @GetMapping("/medication/all")
    public ResponseEntity<GetAllMedicationResDto> getAllMedication() {
        return ResponseEntity.ok(reportService.getAllMedication());
    }

    @GetMapping("/summary")
    public ResponseEntity<GetSummaryResDto> getSummary() {
        return ResponseEntity.ok(reportService.getSummary());
    }
}
