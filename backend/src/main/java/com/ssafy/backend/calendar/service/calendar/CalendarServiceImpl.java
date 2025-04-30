package com.ssafy.backend.calendar.service.calendar;

import com.ssafy.backend.calendar.dto.resDto.GetBearingPeriodResDto;
import com.ssafy.backend.calendar.dto.resDto.GetMenstrualPredictionResDto;
import com.ssafy.backend.calendar.repository.cycle.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
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
