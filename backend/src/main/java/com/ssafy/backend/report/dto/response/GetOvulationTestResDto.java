package com.ssafy.backend.report.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetOvulationTestResDto{
    private String fertile_period_start_date;
    private String fertile_period_end_date;
    private String fertile_day;
}
