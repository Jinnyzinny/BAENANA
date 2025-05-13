package com.ssafy.backend.menstrual.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetMenstrualCycleResDto {
    private Long cycle_id;
    private String start_date;
    private String end_date;
    private List<SymptomDailyDetail> detail;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SymptomDailyDetail {
        protected Long daily_log_id;
        protected String date;
        protected Integer bleeding_level;
        protected Integer pain_level;
        protected Integer stress_level;
        protected List<String> symptoms;
    }
}
