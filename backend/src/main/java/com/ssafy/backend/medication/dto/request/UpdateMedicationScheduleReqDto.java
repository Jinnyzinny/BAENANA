package com.ssafy.backend.medication.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMedicationScheduleReqDto {
    private String name;
    private LocalDate start_date;
    private LocalDate end_date;
    private LocalTime[] time_taken;
    private String memo;
}