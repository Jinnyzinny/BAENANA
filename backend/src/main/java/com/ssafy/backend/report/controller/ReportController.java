package com.ssafy.backend.report.controller;

import com.ssafy.backend.medication.service.calendar.MedicationService;
import com.ssafy.backend.medication.service.report.MedicationReportService;
import com.ssafy.backend.menstrual.service.report.MenstrualService;
import com.ssafy.backend.report.dto.response.*;
import com.ssafy.backend.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<GetAlarmResDto> getAlarm() {
        return ResponseEntity.ok(reportService.getAlarm());
    }

    @GetMapping("/menstrual/info")
    public ResponseEntity<GetMenstrualInfoResDto> getMenstrualInfo() {
        return ResponseEntity.ok(menstrualService.getMenstrualInfo());
    }

    @GetMapping("/menstrual/ovulation_test")
    public ResponseEntity<GetOvulationTestResDto> getOvulationTest() {
        return ResponseEntity.ok(menstrualService.getOvulationTest());
    }

    @GetMapping("/menstrual/recent")
    public ResponseEntity<GetRecentMenstrualResDto> getRecentMenstrual() {
        return ResponseEntity.ok(menstrualService.getRecentMenstrual());
    }

    @GetMapping("/menstrual/all")
    public ResponseEntity<GetAllMenstrualResDto> getAllMenstrual() {
        return ResponseEntity.ok(menstrualService.getAllMenstrual());
    }

    @GetMapping("/medication/recent")
    public ResponseEntity<GetRecentMedicationResDto> getRecentMedication() {
        return ResponseEntity.ok(medicationReportService.getRecentMedication());
    }

    @GetMapping("/medication/all")
    public ResponseEntity<GetAllMedicationResDto> getAllMedication() {
        return ResponseEntity.ok(medicationReportService.getAllMedication());
    }

    @GetMapping("/summary")
    public ResponseEntity<GetSummaryResDto> getSummary() {
        return ResponseEntity.ok(reportService.getSummary());
    }
}
