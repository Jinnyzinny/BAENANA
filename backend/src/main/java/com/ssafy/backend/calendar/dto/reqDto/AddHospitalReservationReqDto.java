package com.ssafy.backend.calendar.dto.reqDto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddHospitalReservationReqDto {
    String hospitalName;
    LocalDateTime reservationDate;
    String purpose;
    String status;
}
