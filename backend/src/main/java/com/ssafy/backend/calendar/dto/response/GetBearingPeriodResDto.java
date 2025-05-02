package com.ssafy.backend.calendar.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetBearingPeriodResDto {
    private String start_date;
    private String end_date;
}
