package com.ssafy.backend.hospital.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
public class AddHospitalReservationReqDto {
    String hospital_name;
    LocalDateTime reservation_date;
    String purpose;
    String status;
}
