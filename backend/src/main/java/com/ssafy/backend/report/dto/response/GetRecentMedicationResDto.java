package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetRecentMedicationResDto {
    private List<MedicationInfo> today_medicine;

    private List<MedicationInfo> medicine_record;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicationInfo{
        private String name;
    }
}
