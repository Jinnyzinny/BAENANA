package com.ssafy.backend.menstrual.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddMenstrualCycleDailyLogReqDto {
    private Long cycle_id;
    private LocalDate date;
    private int bleeding_level;
    private int pain_level;
    private int stress_level;
    private Boolean is_start;
    private Boolean is_end;
    List<String> symptom;
}
