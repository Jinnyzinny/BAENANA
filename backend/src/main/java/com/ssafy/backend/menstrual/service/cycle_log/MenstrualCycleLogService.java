package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.home.dto.response.MessageResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MenstrualCycleLogService {
    MessageResDto addMenstrualCycleDailyLog();
    MessageResDto updateMenstrualCycleDailyLog();
}
