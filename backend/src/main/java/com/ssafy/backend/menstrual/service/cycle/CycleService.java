package com.ssafy.backend.menstrual.service.cycle;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CycleService {
    //    사용자의 생리 주기 정보 추가
    ApiResponse<?> addMenstrualCycle(User user, AddMenstrualCycleReqDto request);

    //    사용자의 생리 주기 정보 열람
    ApiResponse<?> getMenstrualCycle(User user);

    ApiResponse<?> getMonthlyMenstrualCycle(User user, int year, int month);

    //    사용자의 생리 주기 정보 수정
    ApiResponse<?> updateMenstrualCycle(UpdateMenstrualCycleReqDto request, Long cycle_id);

    ApiResponse<?> deleteMenstrualCycle(User user, Long cycle_id);
}
