package com.ssafy.backend.hospital.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddHospitalReservationReqDto {
    private String hospitalName;
    private LocalDateTime reservationDate;
    private String purpose;
    private String status;
}
