package com.ssafy.backend.report.service;

import com.ssafy.backend.report.dto.response.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public interface ReportService {
    GetAlarmResDto getAlarm();
    GetSummaryResDto getSummary();
}
