package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MenstrualCycleLogServiceImpl implements MenstrualCycleLogService {
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;

    @Override
    public MessageResDto addMenstrualCycleDailyLog(User user, AddMenstrualCycleDailyLogReqDto request) {
        menstrualDailyLogRepository.save(
                MenstrualDailyLog.builder()
                        .cycle(
                                menstrualCycleRepository.findById(request.getCycleId()).orElseThrow(
                                        () -> new IllegalArgumentException("주기 정보가 없습니다.")
                                ))
                        .date(request.getDate())
                        .bleedingLevel(request.getBleeding_level())
                        .painLevel(request.getPain_level())
                        .isStart(request.getIs_start())
                        .isEnd(request.getIs_end())
                        .build()
        );
        return MessageResDto.builder()
                .message("생리 주기 세부정보가 성공적으로 저장되었습니다.")
                .build();
    }

    @Override
    public MessageResDto updateMenstrualCycleDailyLog(User user, UpdateMenstrualCycleDailyLogReqDto request) {
        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository.findById(request.getDailyLogId()).orElseThrow();

        BeanUtils.copyProperties(request, dailyLog, NullAwareBeanUtils.getNullPropertyNames(request));
        return MessageResDto.builder()
                .message("생리 주기 정보가 성공적으로 변경되었습니다.")
                .build();
    }
}
