package com.ssafy.backend.hospital.service;

import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.hospital.dto.request.AddHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.request.UpdateHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.response.GetHospitalReservationResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.entity.PurposeType;
import com.ssafy.backend.hospital.entity.StatusType;
import com.ssafy.backend.hospital.repository.HospitalReservationRepository;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class HospitalReservationServiceImpl implements HospitalReservationService {
    private final UserRepository userRepository;
    private final HospitalReservationRepository hospitalReservationRepository;

    @Override
    public MessageResDto addHospitalReservation(
            @AuthenticationPrincipal User user,
            AddHospitalReservationReqDto request) {
        hospitalReservationRepository.save(
                HospitalReservation.builder()
                        .hospitalName(request.getHospital_name())
                        .reservationDate(request.getReservation_date())
                        .user(userRepository
                                .findById(user.getUserId())
                                .orElseThrow(
                                        () ->
                                                new NoSuchElementException("병원예약을 할 회원이 존재하지 않습니다")
                                )
                        )
                        .purpose(PurposeType.CHECKUP)
                        .status(StatusType.COMPLETE_RESERVATION)
                        .build()
        );
        return MessageResDto.builder().message("병원 예약이 등록되었습니다.").build();
    }

    @Override
    public List<GetHospitalReservationResDto> getHospitalReservation(
            @AuthenticationPrincipal User user
    ) {
        Long userId = user.getUserId();
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
                            .reservation_date_time(hr.getReservationDate().toString())
                            .purpose(hr.getPurpose().getDescription())
                            .status(hr.getStatus().getDescription())
                            .build()
            ).toList();
        }
    }

    @Override
    public MessageResDto updateHospitalReservation(
            User user,
            UpdateHospitalReservationReqDto request,
            Long id) {
        HospitalReservation hospitalReservation = hospitalReservationRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("존재 하지 않는 예약입니다.")
        );
        BeanUtils.copyProperties(request, hospitalReservation, NullAwareBeanUtils.getNullPropertyNames(request));
        if (request.getPurpose() != null) {
            hospitalReservation.setPurposeTypeByDescription(request.getPurpose());
        } if (request.getStatus() != null) {
            hospitalReservation.setStatusTypeByDescription(request.getStatus());
        }

        return MessageResDto.builder()
                .message("예약 일정이 성공적으로 변경되었습니다.")
                .build();
    }

    @Override
    public MessageResDto deleteHospitalReservation(User user, Long id) {
        hospitalReservationRepository.deleteById(id);
        return MessageResDto.builder()
                .message("예약 일정이 성공적으로 삭제되었습니다.")
                .build();
    }
}
