package com.ssafy.backend.medication.dto.request;

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