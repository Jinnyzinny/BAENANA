package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetAllMedicationResDto {
    private List<each_medication_record> medicine_record;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class each_medication_record{
        private String name;
        private String start_date;
        private String end_date;
        private List<String> time_taken;
        private String memo;
    }
}
