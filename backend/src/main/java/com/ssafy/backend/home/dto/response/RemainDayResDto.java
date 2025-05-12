package com.ssafy.backend.home.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class RemainDayResDto {
    private Period recorded_menstrual;
    private Period predicted_menstrual;
    private String childbearing_period;
    private String ovulation_day;
    private String PMS;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Period {
        private String start_date;
        private String end_date;
    }
}
