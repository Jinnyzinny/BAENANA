package com.ssafy.backend.menstrual.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddMenstrualCycleReqDto {
    private LocalDate start_date;
    private LocalDate end_date;
}
