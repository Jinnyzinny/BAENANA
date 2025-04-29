package com.ssafy.backend.calendar.service.hospital;

import com.ssafy.backend.calendar.dto.reqDto.hospital.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.reqDto.hospital.UpdateHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetHospitalReservationResDto;
import com.ssafy.backend.calendar.repository.hospital.HospitalReservationRepository;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.entity.PurposeType;
import com.ssafy.backend.hospital.entity.StatusType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

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
    public List<GetHospitalReservationResDto> getHospitalReservation(
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
                    hr -> GetHospitalReservationResDto.builder()
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
    public MessageResDto updateHospitalReservation(UpdateHospitalReservationReqDto request,Long id) {
        HospitalReservation hospitalReservation = hospitalReservationRepository.findById(id).orElseThrow(
                () ->  new NoSuchElementException("존재 하지 않는 예약입니다.")
        );
        BeanUtils.copyProperties(request,hospitalReservation, NullAwareBeanUtils.class);
        return MessageResDto.builder()
                .message("예약 일정이 성공적으로 변경되었습니다.")
                .build();
    }

    @Override
    public MessageResDto deleteHospitalReservation(Long id) {
        hospitalReservationRepository.deleteById(id);
        return MessageResDto.builder()
                .message("예약 일정이 성공적으로 삭제되었습니다.")
                .build();
    }
}
