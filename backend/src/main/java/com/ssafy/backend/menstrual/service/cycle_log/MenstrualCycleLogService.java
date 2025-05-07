package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MenstrualCycleLogService {
    ApiResponse<?> addMenstrualCycleDailyLog(User user, AddMenstrualCycleDailyLogReqDto request);
    ApiResponse<?> updateMenstrualCycleDailyLog(User user, UpdateMenstrualCycleDailyLogReqDto request, Long id);
}
