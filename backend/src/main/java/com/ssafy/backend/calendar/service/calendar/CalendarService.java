package com.ssafy.backend.calendar.service.calendar;

import com.ssafy.backend.calendar.dto.resDto.calendar.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.resDto.calendar.GetDailyInfoResDto;
import com.ssafy.backend.calendar.dto.resDto.calendar.GetMenstrualPredictionResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CalendarService {
    GetDailyInfoResDto getDailyInfo(int year, int month, int day);
    GetBearingPeriodResDto getBearingPeriod();
    GetMenstrualPredictionResDto getMenstrualPrediction();
}
