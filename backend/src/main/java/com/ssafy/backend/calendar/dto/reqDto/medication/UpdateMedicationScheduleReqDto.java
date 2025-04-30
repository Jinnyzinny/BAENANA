package com.ssafy.backend.calendar.dto.reqDto.medication;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class UpdateMedicationScheduleReqDto {
    String name;
    LocalDate start_date;
    LocalDate end_date;
    LocalTime[] time_taken;
    String memo;
}