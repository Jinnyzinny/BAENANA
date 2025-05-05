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
        private String date;
        private int bleeding_level;
        private int pain_level;
        private List<String> symptoms;
    }
}
