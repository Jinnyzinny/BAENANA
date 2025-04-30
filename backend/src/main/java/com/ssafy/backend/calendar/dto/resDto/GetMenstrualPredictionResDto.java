package com.ssafy.backend.calendar.dto.resDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMenstrualPredictionResDto {
    String start_date;
    String end_date;

}
