package com.ssafy.backend.menstrual.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddMenstrualCycleDailyLogReqDto {
    private Long cycleId;
    private LocalDate date;
    private int bleeding_level;
    private int pain_level;
    private Boolean is_start;
    private Boolean is_end;
}
