package com.ssafy.backend.calendar.dto.resDto;

import com.ssafy.backend.symptom.entity.SymptomLog;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class GetMenstrualCycleResDto {
    private Long cycle_id;
    private String start_date;
    private String end_date;
    private List<SymptomLog> detail;
}
