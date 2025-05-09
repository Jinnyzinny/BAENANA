package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.response.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.response.GetDailyInfoResDto;
import com.ssafy.backend.calendar.dto.response.GetMenstrualPredictionResDto;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CalendarService {
    ApiResponse<?> getDailyInfo(User user, int year, int month, int day);
    ApiResponse<?> getBearingPeriod(User user);
    ApiResponse<?> getMenstrualPrediction(User user);
}
