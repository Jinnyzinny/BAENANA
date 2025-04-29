package com.ssafy.backend.calendar.service.cycle_log;

import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MenstrualCycleLogServiceImpl implements MenstrualCycleLogService {
    @Override
    public MessageResDto addMenstrualCycleDailyLog() {
        return MessageResDto.builder()
                .message("생리 주기 정보가 성공적으로 저장되었습니다.")
                .build();
    }

    @Override
    public MessageResDto updateMenstrualCycleDailyLog() {
        return MessageResDto.builder()
                .message("생리 주기 정보가 성공적으로 변경되었습니다.")
                .build();
    }
}
