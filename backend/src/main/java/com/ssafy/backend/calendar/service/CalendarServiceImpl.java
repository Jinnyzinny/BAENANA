package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.response.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.response.GetDailyInfoResDto;
import com.ssafy.backend.calendar.dto.response.GetMenstrualPredictionResDto;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.repository.HospitalReservationRepository;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.MedicationRepository;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final HospitalReservationRepository hospitalreservationRepository;
    private final MedicationRepository medicationRepository;

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getDailyInfo(
            User user,
            int year,
            int month,
            int day
    ) {
        Long userId = user.getUserId();
        /*
         *검색을 원하는 날짜를 localDate 형태로 바꾼다.
         */
        LocalDate searchForDate = LocalDate.of(year, month, day);
        /*
         * userId를 이용해서 검색일자가 주기 시작일이 검색을 원하는 날짜보다 이전이고 종료일이 이후인 주기를 찾는다.
         * 그렇게 되면 주기 시작일<=검색일자<=종료일의 주기가 나올 것
         * */
        boolean prediction = false;
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                userId,
                                searchForDate,
                                searchForDate).orElse(null);

//        해당 일자가 주기 종료일에 포함하지 않는다면 최근 주기로 예측일을 뽑아온다.
        if (menstrualCycle == null) {
            menstrualCycle = getRecentMenstrualCycle(userId).orElse(null);
            if (menstrualCycle != null) {
                prediction = true;
            }
        }
//        만약 예측일 제공도 불가할 경우 사용자의 주기 정보가 하나도 없는 경우이므로 메시지를 반환합니다.
        if (menstrualCycle == null) {
            return ApiResponse.success("사용자의 주기 정보가 단 하나도 없으므로 정보 제공이 불가합니다.");
        }
        /*
         * 해당 날짜가 포함된 주기정보의 해당 날짜 세부 정보를 얻어낸다.
         * */
        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository
                        .findByCycle_User_UserIdAndDate(
                                userId,
                                searchForDate)
                        .orElse(null);
        /*
         * 해당 날짜의 병원 예약을 얻어낸다.   
         * */
        List<HospitalReservation> reservation =
                hospitalreservationRepository
                        .findByUser_UserIdAndReservationDateBetween(userId, searchForDate.atStartOfDay(), searchForDate.atTime(LocalTime.MAX))
                        .orElse(null);
        /*
         * 사용자의 아이디로 해당 날짜에도 복용을 하는 의약품을 조회하고 없다면 null을 반환한다.
         * */
        List<Medication> medication = medicationRepository
                .findDistinctByUser_UserIdAndEndDateAfter(userId, searchForDate)
                .orElse(null);
        return ApiResponse.success(String.format("%d월 %d일의 일일 정보입니다",
                        searchForDate.getMonthValue(),
                        searchForDate.getDayOfMonth()
                ),
                GetDailyInfoResDto.builder()
//                        정보를 요청한 날짜
                        .date(searchForDate.toString())
                        .prediction(prediction)
                        .menstrual_cycle(
//                               주기 정보 제공
                                GetDailyInfoResDto.menstrual_cycle.builder()
                                        .start_date(menstrualCycle.getStartDate().toString())
                                        .end_date(menstrualCycle.getStartDate().toString())
                                        .build()
                        )
                        .menstrual_daily_log(
                                dailyLog == null ?
                                        null :
                                        GetDailyInfoResDto.menstrual_daily_log.builder()
//                                        주기의 출혈량
                                                .bleeding_level(dailyLog.getBleedingLevel())
//                                        해당 날짜의 통증 정도
                                                .pain_level(dailyLog.getPainLevel())
                                                .symptom(dailyLog.getSymptomLog()
                                                        .stream()
                                                        .map(symptomLog -> symptomLog.getSymptomType().getDescription())
                                                        .toList()
                                                )
                                                .build()
                        )
//                        해당 날짜의 병원 예약 정보
                        .hospital_reservation(
                                reservation == null ?
                                        null :
                                        reservation.stream().map(
                                                        r ->
                                                                GetDailyInfoResDto.Hospital_reservation.builder()
//                                                                      병원 이름
                                                                        .hospital_name(r.getHospitalName())
//                                                                      예약 날짜
                                                                        .reservation_date(r.getReservationDate().toString())
//                                                                      방문 목적
                                                                        .purpose(r.getPurpose())
                                                                        .build())
                                                .toList()
                        )

                        .medication(
                                /*
                                 * 사용자의 일일 약품 정보가 null이거나 비어있을 수 있다.
                                 * 그러나 위에서 null 값 예외처리를 분기를 만든다면 다른 정보에 대한 return이 불가능함
                                 * */
                                medication == null || medication.isEmpty() ?
                                        null :
                                        medication.stream().map(
                                                m ->
                                                        GetDailyInfoResDto.Medication.builder()
//                                                                약 이름
                                                                .medication_name(m.getName())
//                                                                복용 시작 날짜
                                                                .start_date(m.getStartDate().toString())
//                                                                복용 종료 날짜
                                                                .end_date(m.getEndDate().toString())
//                                                                약에 대한 간략한 설명
                                                                .memo(m.getDescription())
//                                                                복용 시간 리스트
                                                                .injection_time(m.getTimeTakenList().stream().map(
                                                                        time -> time.getTime_taken().toString()
                                                                ).toList())
                                                                .build()
                                        ).toList()
                        )
                        .build()
        );
    }

    public Optional<MenstrualCycle> getRecentMenstrualCycle(
            Long userId
    ) {
        return menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId);
    }

    /*
     * 가임기==배란일 계산기는 생리주기 예측과 논리는 똑같다.
     * 가장 최신의 주기를 불러와서 시작일을 기준으로 계산식을 돌린다.
     * 개선 고려 사항: AI 모델이나 오차범위를 기입하면 더 좋을 듯?
     * */
    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getBearingPeriod(User user) {
        /*
         * userId를 얻는다.
         * */
        Long userId = user.getUserId();
        /*
         * 사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.
         * */
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findFirstByUser_UserIdOrderByStartDateDesc(userId)
                        .orElse(null);

        /*
         * 만약 사용자의 생리주기 정보가 없을 경우 null을 반환한다.
         * */
        if (menstrualCycle == null) {
            return ApiResponse.success(
                    "사용자의 생리 주기 데이터가 없습니다"
            );
        }
        return ApiResponse.success(
                "사용자의 가임기 정보입니다.",
                GetBearingPeriodResDto.builder()
                        .start_date(menstrualCycle.getStartDate().plusDays(12).toString())
                        .end_date(menstrualCycle.getStartDate().plusDays(19).toString())
                        .build()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getMenstrualPrediction(User user) {
        /*
         * userId를 얻는다.
         * */
        Long userId = user.getUserId();
        /*
         * 사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.
         * */
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findFirstByUser_UserIdOrderByStartDateDesc(userId)
                        .orElse(null);

        /*
         * 사용자의 주기 정보가 없다면 메시지를 반환한다.
         * */
        if (menstrualCycle == null) {
            return ApiResponse.success(
                    "예측을 할 사용자의 생리주기가 없습니다."
            );
        }

        return ApiResponse.success(
                "사용자의 주기 예측 정보입니다.",
                GetMenstrualPredictionResDto.builder()
                        .start_date(
                                menstrualCycle.getStartDate().plusDays(28).toString())
                        .end_date(
                                menstrualCycle.getEndDate().plusDays(35).toString())
                        .build()
        );
    }
}
