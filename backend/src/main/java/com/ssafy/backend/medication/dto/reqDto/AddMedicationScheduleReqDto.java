package com.ssafy.backend.medication.dto.reqDto;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class AddMedicationScheduleReqDto {
    String name;
    LocalDate start_date;
    LocalDate end_date;
    LocalTime[] time_taken;
    String memo;
}
