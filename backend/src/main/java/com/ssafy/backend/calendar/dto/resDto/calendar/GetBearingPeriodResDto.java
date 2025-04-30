package com.ssafy.backend.calendar.dto.resDto.calendar;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetBearingPeriodResDto {
    private String start_date;
    private String end_date;
}
