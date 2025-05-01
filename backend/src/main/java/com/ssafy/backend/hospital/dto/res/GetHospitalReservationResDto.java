package com.ssafy.backend.hospital.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetHospitalReservationResDto {
    private Long reservation_id;
    private String hospital_name;
    private String reservation_date_time;
    private String purpose;
    private String status;
}
