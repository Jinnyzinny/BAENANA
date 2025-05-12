package com.ssafy.backend.menstrual.service.report;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.report.dto.request.AddOvulationTestReqDto;
import com.ssafy.backend.report.dto.response.GetAllMenstrualResDto;
import com.ssafy.backend.report.dto.response.GetMenstrualInfoResDto;
import com.ssafy.backend.report.dto.response.GetOvulationTestResDto;
import com.ssafy.backend.report.dto.response.GetRecentMenstrualResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MenstrualService {
    ApiResponse<?> getMenstrualInfo(User user);
    ApiResponse<?> AddOvulationTest(User user, AddOvulationTestReqDto request);
    ApiResponse<?> getOvulationTest(User user);
    ApiResponse<?> getRecentMenstrual(User user);
    ApiResponse<?> getAllMenstrual(User user);
}
