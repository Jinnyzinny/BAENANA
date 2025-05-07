package com.ssafy.backend.menstrual.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMenstrualCycleDailyLogReqDto {
    Long cycle_id;
    LocalDate date;
    Integer bleeding_level;
    Integer pain_level;
    Boolean is_start;
    Boolean is_end;
}
