package com.ssafy.backend.calendar.service.calendar;

import com.ssafy.backend.calendar.dto.resDto.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.resDto.GetMenstrualPredictionResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CalendarService {
    GetBearingPeriodResDto getBearingPeriod();
    GetMenstrualPredictionResDto getMenstrualPrediction();
}
