package com.ssafy.backend.menstrual.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class AddMenstrualCycleReqDto {
    LocalDate start_date;
    LocalDate end_date;
}
