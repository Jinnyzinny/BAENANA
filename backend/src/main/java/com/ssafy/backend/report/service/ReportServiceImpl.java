package com.ssafy.backend.report.service;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.report.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;

    @Override
    public GetAlarmResDto getAlarm() {
        return GetAlarmResDto.builder()
                .menstraul_is_normal(true)
                .message("")
                .build();
    }

    @Override
    public GetAllMedicationResDto getAllMedication() {
        return null;
    }

    @Override
    public GetRecentMenstrualResDto getRecentMenstrual() {
        return null;
    }

    @Override
    public GetMenstrualResDto getMenstrual() {
        Long userId = 0L;
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId).orElseThrow();

        return GetMenstrualResDto.builder()
                .cycle()
                .period()
                .is_cycle_normal()
                .is_period_normal()
                .build();
    }

    @Override
    public GetOvulationTestResDto getOvulationTest() {
        return null;
    }

    @Override
    public GetRecentMedicationResDto getRecentMedication() {
        return null;
    }

    @Override
    public GetSummaryResDto getSummary() {
        return null;
    }
}
