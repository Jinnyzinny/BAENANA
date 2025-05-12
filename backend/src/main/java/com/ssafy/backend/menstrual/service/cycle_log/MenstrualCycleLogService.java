package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MenstrualCycleLogService {
    //    일일 생리 주기 기록을 추가한다. 증상 및 출혈량, 통증 등을 포함
    ApiResponse<?> addMenstrualCycleDailyLog(User user, AddMenstrualCycleDailyLogReqDto request);

    //    일일 생리 주기 기록을 수정한다. 증상 및 출혈량, 통증 등을 포함
    ApiResponse<?> updateMenstrualCycleDailyLog(User user, UpdateMenstrualCycleDailyLogReqDto request, Long id);
}
