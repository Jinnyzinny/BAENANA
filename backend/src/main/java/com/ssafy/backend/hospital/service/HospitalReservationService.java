package com.ssafy.backend.hospital.service;

import com.ssafy.backend.hospital.dto.request.AddHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.request.UpdateHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.response.GetHospitalReservationResDto;
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
