package com.ssafy.backend.calendar.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetDailyInfoResDto {
    String date;
    String start_date;
    String end_date;
    Integer bleeding_level;
    Integer pain_level;
//    List<>symptom
//    hospital_reservation;
//    medication;
}
