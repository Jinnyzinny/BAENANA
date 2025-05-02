package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class GetSummaryResDto {
    private Menstrual menstrual;

    private Stress stress;
    
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor    
    static class Menstrual{
        private String bleeding_level;
        private Boolean anomal;
        private String symptom;
    }
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    static class Stress{
        private String stress;
        private Boolean anomal;
    }
}
