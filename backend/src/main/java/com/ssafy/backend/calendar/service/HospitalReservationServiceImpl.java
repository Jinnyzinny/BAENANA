package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.reqDto.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.getHospitalReservationResDto;
import com.ssafy.backend.calendar.repository.HospitalReservationRepository;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.entity.PurposeType;
import com.ssafy.backend.hospital.entity.StatusType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HospitalReservationServiceImpl implements HospitalReservationService {
    private final HospitalReservationRepository hospitalReservationRepository;

    @Override
    public MessageResDto addHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            AddHospitalReservationReqDto request) {
        hospitalReservationRepository.save(
                HospitalReservation.builder()
                        .hospitalName(request.getHospitalName())
                        .reservationDate(request.getReservationDate())
//                        .user()
                        .purpose(PurposeType.CHECKUP)
                        .status(StatusType.COMPLETE_RESERVATION)
                        .build()
        );
        return MessageResDto.builder().message("병원 예약이 등록되었습니다.").build();
    }

    @Override
    public List<getHospitalReservationResDto> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = 0L;
        List<HospitalReservation> hospitalReservationList =
                hospitalReservationRepository.findHospitalReservationByUser_UserId(userId).orElse(
                        null
                );
        if (hospitalReservationList == null) {
            return null;
        } else {
            return hospitalReservationList.stream().map(
                    hr -> getHospitalReservationResDto.builder()
                            .reservation_id(hr.getReservationId())
                            .hospital_name(hr.getHospitalName())
                            .reservation_date_time(hr.getReservationDate())
                            .purpose(hr.getPurpose().getDescription())
                            .status(hr.getStatus().getDescription())
                            .build()
            ).toList();
        }
    }

    @Override
    public MessageResDto updateHospitalReservation() {
        return MessageResDto.builder().build();
    }
}
