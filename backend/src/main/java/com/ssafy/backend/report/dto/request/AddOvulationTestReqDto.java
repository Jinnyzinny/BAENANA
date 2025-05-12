package com.ssafy.backend.report.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class AddOvulationTestReqDto {
    LocalDate date;
    Double value;
}
