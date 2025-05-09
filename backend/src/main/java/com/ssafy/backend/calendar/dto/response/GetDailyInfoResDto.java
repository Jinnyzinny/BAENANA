package com.ssafy.backend.calendar.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetDailyInfoResDto {
    String date;
    String start_date;
    String end_date;
    Integer bleeding_level;
    Integer pain_level;
    List<String> symptom;
    List<Hospital_reservation> hospital_reservation;
    List<Medication> medication;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Hospital_reservation {
        String hospital_name;
        String reservation_date;
        String purpose;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Medication {
        String medication_name;
        String start_date;
        String end_date;
        List<String> injection_time;
        String memo;
    }
}
