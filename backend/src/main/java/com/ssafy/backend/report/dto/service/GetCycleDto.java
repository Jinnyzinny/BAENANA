package com.ssafy.backend.report.dto.service;

import com.ssafy.backend.report.dto.response.GetRecentMenstrualResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class GetCycleDto {
    private int averageCycle;
    private int maxCycle;
    List<GetRecentMenstrualResDto.each_cycle_record> cycleRecord;
}
