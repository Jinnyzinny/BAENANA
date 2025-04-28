package com.ssafy.backend.calendar.dto.reqDto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddHospitalReservationReqDto {
    private String hospitalName;
    private LocalDateTime reservationDate;
    private String purpose;
    private String status;
}
