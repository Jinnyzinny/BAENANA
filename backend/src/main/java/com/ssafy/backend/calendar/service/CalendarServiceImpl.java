package com.ssafy.backend.calendar.service;

import com.ssafy.backend.calendar.dto.response.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.response.GetDailyInfoResDto;
import com.ssafy.backend.calendar.dto.response.GetMenstrualPredictionResDto;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;

    @Override
    public GetDailyInfoResDto getDailyInfo(
            int year, int month, int day
    ) {
        //검색을 원하는 날짜를 localDate 형태로 바꾼다.
        LocalDate localDate = LocalDate.of(year, month, day);
        //해당 날짜가 포함된 주기 정보를 얻는다.
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findByStartDateLessThanEqualAndEndDateGreaterThanEqual(localDate, localDate).orElse(null);
        if (menstrualCycle == null) {
            throw new NoSuchElementException();
        }
        //해당 날짜가 포함된 주기정보의 해당 날짜 세부 정보를 얻어낸다.
        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository
                        .findMenstrualDailyLogByCycle_CycleIdAndDate(
                                menstrualCycle.getCycleId(),
                                localDate)
                        .orElseThrow();

        return GetDailyInfoResDto.builder()
                .date(localDate.toString())
                .start_date(menstrualCycle.getStartDate().toString())//생리 주기의 시작일
                .end_date(menstrualCycle.getEndDate().toString())//생리 주기의 종료일
                .bleeding_level(dailyLog.getBleedingLevel())//출혈량
                .pain_level(dailyLog.getPainLevel())//통증 정도
                .build();
    }

    /*
     * 불편할 수 있는 Convention이나
     * 상단의 GetDailyInfoResDto가 많은 Repository 사용으로
     * 하단에서 쓰이는 두 메소드와의 연관성을 우선적으로 고려
     * */
    private final MenstrualCycleRepository menstrualCycleRepository;
    /*
     * 가임기==배란일 계산기는 생리주기 예측과 논리는 똑같다.
     * 가장 최신의 주기를 불러와서 시작일을 기준으로 계산식을 돌린다.
     * 개선 고려 사항: AI 모델이나 오차범위를 기입하면 더 좋을 듯?
     * */

    @Override
    public GetBearingPeriodResDto getBearingPeriod() {
        Long userId = 0L;
        //사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        if (menstrualCycle == null) {
            throw new NoSuchElementException();
        }

        return GetBearingPeriodResDto.builder()
                .start_date(menstrualCycle.getStartDate().plusDays(19).toString())
                .end_date(menstrualCycle.getStartDate().plusDays(12).toString())
                .build();
    }

    @Override
    public GetMenstrualPredictionResDto getMenstrualPrediction() {
        Long userId = 0L;
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId).orElse(null);
        //사용자 ID를 기준으로 시작일을 최근에서 과거로 가는 객체 리스트를 뽑아 첫번째 객체를 뽑는다.

        if (menstrualCycle == null) {
            throw new NoSuchElementException();
        }
        return GetMenstrualPredictionResDto.builder()
                .start_date(menstrualCycle.getStartDate().plusDays(28).toString())
                .end_date(menstrualCycle.getEndDate().plusDays(35).toString())
                .build();
    }
}
