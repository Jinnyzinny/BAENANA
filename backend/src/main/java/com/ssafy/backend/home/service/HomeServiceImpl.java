package com.ssafy.backend.home.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.home.dto.response.HospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MedicineResDto;
import com.ssafy.backend.home.dto.response.RemainDayResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.repository.HospitalReservationRepository;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.MedicationRepository;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
    private final HospitalReservationRepository hospitalreservationRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MedicationRepository medicationRepository;

    @Override
    public ApiResponse<?> getRemainDay(User user) {
        /*
         * 1. userId를 얻는다
         * */
        Long userId = user.getUserId();
        /*
         * 2. userId를 이용해서 주기 정보를 최근 것에서 과거로 정렬시킨 첫번째 객체를 반환
         * */
        MenstrualCycle menstrualCycle = menstrualCycleRepository
                .findFirstByUser_UserIdOrderByStartDateDesc(userId)
                .orElse(null);
        /*
         * 2.1 만약 해당 객체가 null이라면 사용자의 주기 정보가 아무 것도 없는 것
         * */
        if (menstrualCycle == null) {
            return ApiResponse.success("사용자의 주기 정보가 없습니다.");
        }
        /*
         * 3. 해당 주기 정보를 가지고 다음 주기를 예측한다.
         * */
        return ApiResponse.success(
                "사용자의 다음 생리주기 예측일입니다.",
                RemainDayResDto.builder()
//                        가장 최근의 생리  주기
                        .recorded_menstrual(
                                RemainDayResDto.Period.builder()
                                        .start_date(menstrualCycle.getStartDate().toString())
                                        .end_date(menstrualCycle.getEndDate().toString())
                                        .build()
                        )
//                        생리 주기 예측일의 객체를 반환한다
                        .predicted_menstrual(
                                RemainDayResDto.Period.builder()
//                                주기의 예측 시작일
                                        .start_date(menstrualCycle.getStartDate().plusDays(28).toString())
//                                주기의 예측 종료일
                                        .end_date(menstrualCycle.getEndDate().plusDays(35).toString())
                                        .build())
//                        가임기
                        .childbearing_period(menstrualCycle.getStartDate().plusDays(9).toString())
//                        배란일
                        .ovulation_day(menstrualCycle.getStartDate().plusDays(14).toString())
//                        PMS
                        .PMS(menstrualCycle.getStartDate().plusDays(21).toString())
                        .build()
        );
    }

    @Override
    public ApiResponse<?> getMedicine(User user) {
        /*
         * 1. userId를 얻는다.
         * */
        Long userId = user.getUserId();
        /*
         * 2. 복용 종료일이 오늘 이후인 약들 중 오늘 복용해야할 약물들을 찾는다.
         * */
        List<Medication> medication = medicationRepository.findDistinctByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                userId,
                LocalDate.now(),
                LocalDate.now()
        ).orElse(null);
        /*
         * 2.1 만약 복용해야할 약물이 아무것도 없다면 복용할 약이 없다고 알림을 보낸다.
         * */
        if (medication == null || medication.isEmpty()) {
            return ApiResponse.success("복용할 약이 없습니다.");
        }
        /*
         * 3. 사용자가 복용해야할 약의 정보를 반환한다.
         * */
        return ApiResponse.success(
                "복용할 약의 정보입니다.",
                MedicineResDto.builder()
                        .medicine(getMedicineMessage(medication))
                        .build()
        );
    }

    public String getMedicineMessage(List<Medication> medication) {
        /*
         * 1. 추가적인 메모리 사용을 막기 위해서 StringBuilder를 이용해서 문자열을 붙인다
         * */
        StringBuilder medicineMessage = new StringBuilder();
        /*
         * 2. 복용 시간을 리스트에서 추출하여 ", "로 구분된 문자열로 만듦
         * */
        medication.forEach(m -> {
            String times = m.getTimeTakenList().stream()
//                    StringBuilder로 시간을 문자열화 만들어 붙인다.
                    .map(time -> String.valueOf(time.getTime_taken().getHour()))
                    .collect(Collectors.joining(", "));
            /*
             * 3. 최종 시간을 문자열로 반환한다.
             * */
            medicineMessage.append(String.format("오늘은 %s시에 %s 복용 일정이 있습니다.\n", times, m.getName()));
        });
        return medicineMessage.toString();
    }

    @Override
    public ApiResponse<?> getHospitalReservation(User user) {
        /*
         * 1. userId를 얻는다.
         * */
        Long userId = user.getUserId();
        /*
         * 2. 엄청 길긴 한데 UserId와 오늘 날짜 이후로 찾은 결과중 첫번째를 가져온다.
         * 이걸 가져오면 오늘 이후의 첫번째 당면한 예약 결과를 가져온다.
         * */
        HospitalReservation hospitalReservation =
                hospitalreservationRepository
                        .findFirstByUser_UserIdAndReservationDateAfterOrderByReservationDate(userId, LocalDateTime.now())
                        .orElse(
                                null
                        );
        /*
         * 2.1 예약 정보가 아무것도 없다면 메시지를 반환한다.
         * */
        if (hospitalReservation == null) {
            return ApiResponse.success("사용자의 병원 예약이 없습니다");
        }
        /*
         * 3. 사용자의 병원 예약 정보를 시간을 깔끔하게 다듬어 보낸다.
         * */
        return ApiResponse.success(
                "사용자의 병원 예약입니다.",
                getHospitalReservationMessage(hospitalReservation));
    }

    // 00분일 경우 분을 표시하기 싫어서 만든 Method
    public HospitalReservationResDto getHospitalReservationMessage(HospitalReservation hospitalReservation) {
        LocalDateTime dateTime = hospitalReservation.getReservationDate();

        /*
         * 해당 분이 00분일 경우 00시까지라고 메시지 반환
         * */
        if (dateTime.getMinute() == 0) {
            return HospitalReservationResDto.builder()
                    .reservation(
                            String.format(
                                    "%d년 %d일 %d일 %d시에 %s 방문 일정이 있습니다",
                                    dateTime.getYear(),
                                    dateTime.getMonth().getValue(),
                                    dateTime.getDayOfMonth(),
                                    dateTime.getHour(),
                                    hospitalReservation.getHospitalName()
                            )
                    )
                    .build();
        } else {
            return HospitalReservationResDto.builder()
                    .reservation(
                            String.format(
                                    "%d년 %d일 %d일 %d시 %d분에 %s 방문 일정이 있습니다",
                                    dateTime.getYear(),
                                    dateTime.getMonth().getValue(),
                                    dateTime.getDayOfMonth(),
                                    dateTime.getHour(),
                                    dateTime.getMinute(),
                                    hospitalReservation.getHospitalName()
                            )
                    )
                    .build();
        }
    }
}
