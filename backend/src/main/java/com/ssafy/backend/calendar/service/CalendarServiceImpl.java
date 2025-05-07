package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.response.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.response.GetDailyInfoResDto;
import com.ssafy.backend.calendar.dto.response.GetMenstrualPredictionResDto;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;

    @Override
    public ApiResponse<?> getDailyInfo(
            User user,
            int year,
            int month,
            int day
    ) {
        //검색을 원하는 날짜를 localDate 형태로 바꾼다.
        LocalDate searchForDate = LocalDate.of(year, month, day);

        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                user.getUserId(),
                                searchForDate,
                                searchForDate).orElse(null);

        //해당 날짜가 포함된 주기정보의 해당 날짜 세부 정보를 얻어낸다.
        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository
                        .findByCycle_User_UserIdAndDate(
                                user.getUserId(),
                                searchForDate)
                        .orElse(null);

        if (dailyLog == null) {
            return ApiResponse.success(
                    "사용자의 생리주기 데이터가 없습니다."
            );
        } else {
            return ApiResponse.success("", GetDailyInfoResDto.builder()
                    .date(searchForDate.toString())
                    .start_date(
                            menstrualCycle.getStartDate().toString())//생리 주기의 시작일
                    .end_date(
                            menstrualCycle.getEndDate().toString())//생리 주기의 종료일
                    .bleeding_level(
                            dailyLog.getBleedingLevel())//출혈량
                    .pain_level(
                            dailyLog.getPainLevel())//통증 정도
                    .build());
        }
    }

    /*
     * 가임기==배란일 계산기는 생리주기 예측과 논리는 똑같다.
     * 가장 최신의 주기를 불러와서 시작일을 기준으로 계산식을 돌린다.
     * 개선 고려 사항: AI 모델이나 오차범위를 기입하면 더 좋을 듯?
     * */
    @Override
    public ApiResponse<?> getBearingPeriod(User user) {
        Long userId = user.getUserId();
        //사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findFirstByUser_UserIdOrderByStartDateDesc(userId)
                        .orElse(null);

        if (menstrualCycle == null) {
            return ApiResponse.success(
                    "사용자의 생리 주기 데이터가 없습니다"
            );
        } else {
            return ApiResponse.success(
                    "사용자의 가임기 정보입니다.",
                    GetBearingPeriodResDto.builder()
                            .start_date(menstrualCycle.getStartDate().plusDays(19).toString())
                            .end_date(menstrualCycle.getStartDate().plusDays(12).toString())
                            .build()
            );
        }
    }

    @Override
    public ApiResponse<?> getMenstrualPrediction(User user) {
        Long userId = user.getUserId();

        //사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findFirstByUser_UserIdOrderByStartDateDesc(userId)
                        .orElse(null);

        if (menstrualCycle == null) {
            return ApiResponse.success(
                    "사용자의 생리주기가 없습니다."
            );
        }

        return ApiResponse.success(
                "사용자의 생리주기를 반환했습니다."
                , GetMenstrualPredictionResDto.builder()
                        .start_date(
                                menstrualCycle.getStartDate().plusDays(28).toString())
                        .end_date(
                                menstrualCycle.getEndDate().plusDays(35).toString())
                        .build()
        );
    }
}
