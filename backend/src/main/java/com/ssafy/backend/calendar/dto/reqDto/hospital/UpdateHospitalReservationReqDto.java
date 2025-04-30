package com.ssafy.backend.calendar.dto.reqDto.hospital;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateHospitalReservationReqDto {
    String hospital_name;
    LocalDateTime reservation_date;
    String purpose;
}
