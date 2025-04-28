package com.ssafy.backend.calendar.service.hospital;

import com.ssafy.backend.calendar.dto.reqDto.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetHospitalReservationResDto;
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

    List<GetHospitalReservationResDto> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );

    MessageResDto updateHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );

    MessageResDto deleteHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    );
}
