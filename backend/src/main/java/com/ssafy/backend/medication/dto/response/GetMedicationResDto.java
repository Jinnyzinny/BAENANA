package com.ssafy.backend.medication.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetMedicationResDto {
    Long medication_id;
    String name;
    String start_date;
    String end_date;
    List<String> time_taken;
    String memo;
}
