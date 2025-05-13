package com.ssafy.backend.hospital.service;

import com.ssafy.backend.common.ApiResponse;
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

    ApiResponse<?> addHospitalReservation(
            @AuthenticationPrincipal User user,
            AddHospitalReservationReqDto request
    );

    ApiResponse<?> getHospitalReservation(
            @AuthenticationPrincipal User user,
            int month
    );

    ApiResponse<?> updateHospitalReservation(
            @AuthenticationPrincipal User user,
            UpdateHospitalReservationReqDto request,
            Long id
    );

    ApiResponse<?> deleteHospitalReservation(
            @AuthenticationPrincipal User user,
            Long id
    );
}
