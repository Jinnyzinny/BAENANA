package com.ssafy.backend.report.service;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.report.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

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
    public GetSummaryResDto getSummary() {
        return null;
    }
}
