package com.ssafy.backend.hospital.service;

import com.ssafy.backend.hospital.dto.request.AddHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.request.UpdateHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.response.GetHospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface HospitalReservationService {

    MessageResDto addHospitalReservation(
            @AuthenticationPrincipal User user,
            AddHospitalReservationReqDto request
    );

    List<GetHospitalReservationResDto> getHospitalReservation(
            @AuthenticationPrincipal User user
    );

    MessageResDto updateHospitalReservation(
            @AuthenticationPrincipal User user,
            UpdateHospitalReservationReqDto request,
            Long id
    );

    MessageResDto deleteHospitalReservation(
            @AuthenticationPrincipal User user,
            Long id
    );
}
