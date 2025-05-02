package com.ssafy.backend.report.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMenstrualResDto {
    private Integer cycle;
    private Integer period;
    private Boolean is_cycle_normal;
    private Boolean is_period_normal;
}
