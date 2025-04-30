package com.ssafy.backend.calendar.service.hospital;

import com.ssafy.backend.calendar.dto.reqDto.hospital.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.reqDto.hospital.UpdateHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetHospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface HospitalReservationService {

    MessageResDto addHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            AddHospitalReservationReqDto request
    );

    List<GetHospitalReservationResDto> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );

    MessageResDto updateHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            UpdateHospitalReservationReqDto request,
            Long id
    );

    MessageResDto deleteHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            Long id
    );
}
