package com.ssafy.backend.calendar.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetDailyInfoResDto {
    String date;
    Boolean prediction;
    menstrual_cycle menstrual_cycle;
    menstrual_daily_log menstrual_daily_log;
    List<Hospital_reservation> hospital_reservation;
    List<Medication> medication;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class menstrual_cycle {
        Long cycle_id;
        String start_date;
        String end_date;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class menstrual_daily_log {
        Long daily_id;
        int bleeding_level;
        int pain_level;
        List<String> symptom;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Hospital_reservation {
        Long reservation_id;
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
        Long medication_id;
        String medication_name;
        String start_date;
        String end_date;
        List<String> injection_time;
        String memo;
    }
}
