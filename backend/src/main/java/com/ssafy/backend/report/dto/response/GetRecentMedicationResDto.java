package com.ssafy.backend.report.dto.response;

import com.ssafy.backend.medication.entity.Medication;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Builder
public class GetRecentMedicationResDto {
    private Set<MedicationInfo> today_medicine;

    private List<MedicationInfo> medicine_record;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicationInfo{
        private String name;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof MedicationInfo)) return false;
            MedicationInfo info = (MedicationInfo) o;
            return Objects.equals(name, info.name); // id 기준으로 비교
        }

        @Override
        public int hashCode() {
            return Objects.hash(name); // id 기준으로 해시 생성
        }
    }
}
