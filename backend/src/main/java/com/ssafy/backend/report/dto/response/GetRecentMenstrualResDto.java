package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetRecentMenstrualResDto {
    private Integer average_cycle;
    private Integer max_cycle;
    private List<each_cycle_record> cycle_record;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class each_cycle_record{
        private String start_date;
        private String end_date;
        private Integer period;
        private Integer cycle;
    }
}
