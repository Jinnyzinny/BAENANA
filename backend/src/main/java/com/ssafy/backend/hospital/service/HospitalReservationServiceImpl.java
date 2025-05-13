package com.ssafy.backend.hospital.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.hospital.dto.request.AddHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.request.UpdateHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.response.GetHospitalReservationResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.entity.PurposeType;
import com.ssafy.backend.hospital.entity.StatusType;
import com.ssafy.backend.hospital.exception.HospitalReservationException;
import com.ssafy.backend.hospital.repository.HospitalReservationRepository;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class HospitalReservationServiceImpl implements HospitalReservationService {
    private final UserRepository userRepository;
    private final HospitalReservationRepository hospitalReservationRepository;

    @Override
    public ApiResponse<?> addHospitalReservation(
            User user,
            AddHospitalReservationReqDto request) {
//        request로 받은 정보를 통해서 사용자의 병원 예약 일정을 추가한다.
        hospitalReservationRepository.save(
                HospitalReservation.builder()
                        .hospitalName(request.getHospital_name())
                        .reservationDate(request.getReservation_date())
//                        만약 사용자의 데이터가 없다면 오류 처리
//                        이것은 방법이 없다.
                        .user(userRepository
                                .findById(user.getUserId())
                                .orElseThrow(
                                        () ->
                                                new NoSuchElementException("병원예약을 할 회원이 존재하지 않습니다")
                                )
                        )
                        .purpose(PurposeType.fromDescription(request.getPurpose()))
                        .status(StatusType.COMPLETE_RESERVATION)
                        .build()
        );
        return ApiResponse.success("병원 예약이 등록되었습니다.");
    }

    @Override
    public ApiResponse<?> getHospitalReservation(
            User user,
            int month
    ) {
        /*
         * userId를 얻는다
         * */
        Long userId = user.getUserId();
        /*
        * 이번 달의 첫 날과 마지막날을 얻는다.
        * */
        LocalDateTime startOfMonth = LocalDate.of(LocalDate.now().getYear(), month, 1).atStartOfDay();
        LocalDateTime endOfMonth = YearMonth.of(LocalDate.now().getYear(),month).atEndOfMonth().atTime(23,59,59);
        /*
         * 사용자가 예약한 병원 리스트를 얻는다.
         * */
        List<HospitalReservation> hospitalReservationList =
                hospitalReservationRepository.findByUser_UserIdAndReservationDateBetween(
                        userId,
                        startOfMonth,
                        endOfMonth
                ).orElse(null);
        /*
         * 예약 병원 리스트가 없을 경우
         * */
        if (hospitalReservationList == null || hospitalReservationList.isEmpty()) {
            return ApiResponse.success("사용자의 병원 예약 리스트가 없습니다");
        }
        return ApiResponse.success(
                "사용자의 병원 예약 리스트입니다",
                hospitalReservationList.stream().map(
                        hr -> GetHospitalReservationResDto.builder()
                                .reservation_id(hr.getReservationId())
                                .hospital_name(hr.getHospitalName())
                                .reservation_date_time(hr.getReservationDate().toString())
                                .purpose(hr.getPurpose().getDescription())
                                .status(hr.getStatus().getDescription())
                                .build()
                ).toList());
    }

    @Override
    public ApiResponse<?> updateHospitalReservation(
            User user,
            UpdateHospitalReservationReqDto request,
            Long id) {
        /*
         * 해당 객체 ID로 병원 객체를 찾는다.
         * 병원 예약이 없을 경우 메시지를 반환한다.
         * */
        HospitalReservation hospitalReservation =
                hospitalReservationRepository.findById(id).orElseThrow(() ->
                        new HospitalReservationException("변경할 병원 예약이 존재하지 않습니다."));

        /*
        * BeanUtils.copyProperties를 이용해서 null값을 제외한 값들을 객체에 DB에서 불러온 객체에 복사한다.
        * */
        BeanUtils.copyProperties(request, hospitalReservation, NullAwareBeanUtils.getNullPropertyNames(request));
//        Enum을 자바에서만 검증하므로 copyProperties를 통할수 없다
        if (request.getPurpose() != null) {
            hospitalReservation.setPurposeTypeByDescription(request.getPurpose());
        }
        if (request.getStatus() != null) {
            hospitalReservation.setStatusTypeByDescription(request.getStatus());
        }
        return ApiResponse.success("예약 일정이 성공적으로 변경되었습니다.");
    }

    @Override
    public ApiResponse<?> deleteHospitalReservation(User user, Long id) {
        HospitalReservation hospitalReservation =
                hospitalReservationRepository.findById(id).orElseThrow(
                        () -> new HospitalReservationException("변경할 병원 예약이 존재하지 않습니다."));
        hospitalReservationRepository.deleteById(hospitalReservation.getReservationId());
        return ApiResponse.success("예약 일정이 성공적으로 삭제되었습니다.");
    }
}
