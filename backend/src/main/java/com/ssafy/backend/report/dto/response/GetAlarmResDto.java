package com.ssafy.backend.report.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAlarmResDto {
    private Boolean menstrual_is_normal;
    private String message;
}
