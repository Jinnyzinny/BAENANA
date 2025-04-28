package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.reqDto.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.getHospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public interface HospitalReservationService {

    MessageResDto addHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            AddHospitalReservationReqDto request
    );

    List<getHospitalReservationResDto> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );

    MessageResDto updateHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );
}
