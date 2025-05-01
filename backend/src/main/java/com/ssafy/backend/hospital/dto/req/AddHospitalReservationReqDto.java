package com.ssafy.backend.hospital.dto.req;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddHospitalReservationReqDto {
    String hospitalName;
    LocalDateTime reservationDate;
    String purpose;
    String status;
}
