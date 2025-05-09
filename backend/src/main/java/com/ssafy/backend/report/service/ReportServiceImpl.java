package com.ssafy.backend.report.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.menstrual.repository.custom.MenstrualCycleCustomRepository;
import com.ssafy.backend.report.dto.response.GetAlarmResDto;
import com.ssafy.backend.report.dto.response.GetSummaryResDto;
import com.ssafy.backend.user.entity.User;
import io.micrometer.core.instrument.binder.logging.LogbackMetrics;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final MenstrualCycleCustomRepository menstrualCycleCustomRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final LogbackMetrics logbackMetrics;

    @Override
    public ApiResponse<?> getAlarm(User user) {
        Long userId = user.getUserId();
        List<MenstrualCycle> menstrualCycle =
                menstrualCycleRepository.findTop4ByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        if (menstrualCycle == null) {
            return null;
        }
        int maxCycle = Integer.MIN_VALUE;
        int minCycle = Integer.MAX_VALUE;

        for (int i = 1; i < menstrualCycle.size(); i++) {
            int cycle = (int)
                    ChronoUnit.DAYS.between(menstrualCycle.get(i).getStartDate(), menstrualCycle.get(i - 1).getEndDate());
            maxCycle = Math.max(maxCycle, cycle);
            minCycle = Math.min(minCycle, cycle);
        }

        if (maxCycle - minCycle >= 7) {
            return ApiResponse.success("사용자의 월경 주기 정상 여부 결과입니다.",
                    GetAlarmResDto.builder()
                            .menstraul_is_normal(false)
                            .message("최근 월경 주기가 불규칙합니다.")
                            .build());
        } else {
            return ApiResponse.success("사용자의 월경 주기 정상 여부 결과입니다.",
                    GetAlarmResDto.builder()
                            .menstraul_is_normal(true)
                            .message("최근 월경 주기가 규칙적입니다.")
                            .build());
        }
    }

    //    이번달의 월경 출혈량, 스트레스 지수, 이번달 월경 증상등을 반환한다.
    @Override
    public ApiResponse<?> getSummary(User user) {
        /*
         * userId를 얻는다.
         * */
        Long userId = user.getUserId();

        List<MenstrualCycle> cycleList =
                menstrualCycleCustomRepository.findThisMonthCycles();

        if (cycleList == null || cycleList.isEmpty()) {
            return ApiResponse.success("요약할 정보가 없습니다.");
        }
        return ApiResponse.success("사용자의 요약 리포트 API입니다.", GetSummaryResDto.builder()
                .menstrual(
                        GetSummaryResDto.Menstrual.builder()
                                .abnormal(getAbnormalMenstrual(cycleList))
                                .bleeding_level(getBleedingLevel(cycleList))
                                .symptom(getSymptoms(cycleList))
                                .build()
                )
                .stress(null
//                        GetSummaryResDto.Stress.builder()
//                                .abnormal()
//                                .stress()
//                                .build()
                )
                .build());

    }

    public Boolean getAbnormalMenstrual(List<MenstrualCycle> cycleList) {
        return true;
    }

    public String getBleedingLevel(List<MenstrualCycle> cycleList) {
        int bleedingLevel = 0;
        int bleedingDay = 0;
        for (int i = 0; i < cycleList.size(); i++) {
            for (int day = 0; day < cycleList.get(i).getLogs().size(); day++) {
                bleedingDay++;
                bleedingLevel += cycleList.get(i).getLogs().get(day).getBleedingLevel();
            }
        }
        return String.format("%.2f", (double) bleedingLevel / bleedingDay);
    }

    public List<String> getSymptoms(List<MenstrualCycle> cycleList) {
        return cycleList.stream()
                .flatMap(cycle -> cycle.getLogs().stream())
                .flatMap(log -> log.getSymptomLog()
                        .stream()
                        .map(symptom -> symptom.getSymptomType().getDescription())
                )
                .distinct() // 중복 제거
                .collect(Collectors.toList());
    }
}
