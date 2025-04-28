package com.ssafy.backend.calendar.dto.resDto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class getHospitalReservationResDto {
    private Long reservation_id;
    private String hospital_name;
    private LocalDateTime reservation_date_time;
    private String purpose;
    private String status;
}
