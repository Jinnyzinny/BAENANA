package com.ssafy.backend.calendar.dto.resDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMedicationResDto {
    Long medication_id;
    String name;
    String start_date;
    String end_date;
    String[] time_taken;
    String memo;
}
