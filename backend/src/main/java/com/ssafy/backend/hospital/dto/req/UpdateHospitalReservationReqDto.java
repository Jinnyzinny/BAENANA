package com.ssafy.backend.hospital.dto.req;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateHospitalReservationReqDto {
    String hospital_name;
    LocalDateTime reservation_date;
    String purpose;
}
