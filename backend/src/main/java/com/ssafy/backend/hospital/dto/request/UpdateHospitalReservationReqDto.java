package com.ssafy.backend.hospital.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateHospitalReservationReqDto {
    String hospital_name;
    LocalDateTime reservation_date;
    String purpose;
}
