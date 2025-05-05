package com.ssafy.backend.menstrual.service.report;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.report.dto.response.GetAllMenstrualResDto;
import com.ssafy.backend.report.dto.response.GetMenstrualInfoResDto;
import com.ssafy.backend.report.dto.response.GetOvulationTestResDto;
import com.ssafy.backend.report.dto.response.GetRecentMenstrualResDto;
import com.ssafy.backend.report.dto.service.GetCycleDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class MenstrualServiceImpl implements MenstrualService {
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;


    @Override
    public GetMenstrualInfoResDto getMenstrualInfo(User user) {
        Long userId = user.getUserId();
        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findByUser_UserId(userId).orElseThrow();

        int cycleSum = 0;
        int periodSum = 0;

        int maxCycle=Integer.MIN_VALUE;
        int minCycle=Integer.MAX_VALUE;

        for (int i = 0; i < menstrualCycleList.size(); i++) {
            LocalDate endDate = menstrualCycleList.get(i).getEndDate();
            LocalDate startDate = menstrualCycleList.get(i).getStartDate();

            if (i >= 1) {
                LocalDate prevStartDate = menstrualCycleList.get(i - 1).getStartDate();
                int cycle=(int) ChronoUnit.DAYS.between(prevStartDate, startDate);
                cycleSum += cycle;

                maxCycle = Math.max(maxCycle, cycle);
                minCycle = Math.min(minCycle, cycle);
            }
            periodSum += (int) ChronoUnit.DAYS.between(startDate, endDate);
        }
        int avgCycle = cycleSum / menstrualCycleList.size();
        int avgPeriod = periodSum / menstrualCycleList.size();

        if(maxCycle-minCycle>=7){
            return GetMenstrualInfoResDto.builder()
                    .cycle(avgCycle)
                    .period(avgPeriod)
//                정상 판별 어떻게 할 예정??
                    .is_cycle_normal(true)
                    .is_period_normal(null)
                    .build();
        } else {
            return GetMenstrualInfoResDto.builder()
                    .cycle(avgCycle)
                    .period(avgPeriod)
//                정상 판별 어떻게 할 예정??
                    .is_cycle_normal(false)
                    .is_period_normal(null)
                    .build();
        }
    }

    @Override
    public GetOvulationTestResDto getOvulationTest(User user) {
        Long userId = user.getUserId();

//        디아 비전측 정보로 채운다. 이 부분은 제공 API로 대체 가능성 높음
        return GetOvulationTestResDto.builder()
                .fertile_day("")
                .fertile_period_start_date("")
                .fertile_period_end_date("")
                .build();
    }

    @Override
    public GetRecentMenstrualResDto getRecentMenstrual(User user) {
        Long userId = user.getUserId();
        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findTop6ByUser_UserIdOrderByStartDateDesc(userId).orElseThrow();

        GetCycleDto cycle =  getCycleInfo(menstrualCycleList);
        return GetRecentMenstrualResDto.builder()
                .average_cycle(cycle.getAverageCycle())
                .max_cycle(cycle.getMaxCycle())
                .cycle_record(cycle.getCycleRecord())
                .build();
    }

    @Override
    public GetAllMenstrualResDto getAllMenstrual(User user) {
        Long userId = user.getUserId();

        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findByUser_UserIdOrderByStartDateDesc(userId).orElseThrow();

        GetCycleDto cycle =  getCycleInfo(menstrualCycleList);
        return GetAllMenstrualResDto.builder()
                .average_cycle(cycle.getAverageCycle())
                .max_cycle(cycle.getMaxCycle())
                .cycle_record(cycle.getCycleRecord())
                .build();
    }

    public GetCycleDto getCycleInfo(List<MenstrualCycle> menstrualCycleList) {
        int cycleSum = 0;
        int maxCycle = Integer.MIN_VALUE;
        for (int i = 1; i < menstrualCycleList.size(); i++) {
            LocalDate startDate = menstrualCycleList.get(i).getStartDate();
            LocalDate prevStartDate = menstrualCycleList.get(i - 1).getStartDate();

            maxCycle = Math.max(maxCycle, (int) ChronoUnit.DAYS.between(prevStartDate, startDate));
            cycleSum += (int) ChronoUnit.DAYS.between(prevStartDate, startDate);
        }

        List<GetRecentMenstrualResDto.each_cycle_record> cycleRecord = new ArrayList<>();

        for (MenstrualCycle cycle : menstrualCycleList) {
            cycleRecord.add(GetRecentMenstrualResDto.each_cycle_record.builder()
                    .start_date(cycle.getStartDate().toString())
                    .end_date(cycle.getEndDate().toString())
                    .period((int) ChronoUnit.DAYS.between(cycle.getStartDate(), cycle.getEndDate()))
                    .build());
        }
        int averageCycle = cycleSum / menstrualCycleList.size();

        return GetCycleDto.builder()
                .averageCycle(averageCycle)
                .maxCycle(maxCycle)
                .cycleRecord(cycleRecord)
                .build();
    }
}
