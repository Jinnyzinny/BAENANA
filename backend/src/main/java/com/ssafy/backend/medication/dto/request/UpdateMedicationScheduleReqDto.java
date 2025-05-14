package com.ssafy.backend.medication.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMedicationScheduleReqDto {
    String name;
    LocalDate start_date;
    LocalDate end_date;
    List<LocalTime> time_taken;
    String memo;
}