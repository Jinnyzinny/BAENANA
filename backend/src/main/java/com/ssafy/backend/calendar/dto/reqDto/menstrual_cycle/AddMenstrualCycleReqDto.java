package com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class AddMenstrualCycleReqDto {
    LocalDate start_date;
    LocalDate end_date;
}
