package com.ssafy.backend.report.service;

import com.ssafy.backend.report.dto.response.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface ReportService {
    GetAlarmResDto getAlarm();
    GetAllMedicationResDto getAllMedication();
    GetRecentMenstrualResDto getRecentMenstrual();
    GetMenstrualResDto getMenstrual();
    GetOvulationTestResDto getOvulationTest();
    GetRecentMedicationResDto getRecentMedication();
    GetSummaryResDto getSummary();
}
