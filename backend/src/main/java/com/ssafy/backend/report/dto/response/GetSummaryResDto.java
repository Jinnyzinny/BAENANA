package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetSummaryResDto {
    private Menstrual menstrual;

    private Stress stress;
    
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor    
    public static class Menstrual{
        private String bleeding_level;
        private Boolean normal;
        private List<String> symptom;
    }
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Stress{
        private String stress;
        private Boolean normal;
    }
}
