package com.ssafy.backend.report.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.custom.MenstrualCycleCustomRepository;
import com.ssafy.backend.report.dto.response.GetAlarmResDto;
import com.ssafy.backend.report.dto.response.GetSummaryResDto;
import com.ssafy.backend.report.utils.GetSummary;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final MenstrualCycleCustomRepository menstrualCycleCustomRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;

    private final GetSummary getSummary;

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getAlarm(User user) {
        Long userId = user.getUserId();
        List<MenstrualCycle> menstrualCycle =
                menstrualCycleRepository.findTop4ByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        if (menstrualCycle == null || menstrualCycle.isEmpty()) {
            return ApiResponse.success("사용자의 정보가 없어 알람 메시지를 제공하는데 실패했습니다.");
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
    @Transactional(readOnly = true)
    public ApiResponse<?> getSummary(User user) {
        /*
         * userId를 얻는다.
         * */
        Long userId = user.getUserId();

        List<MenstrualCycle> thisMonthCycleList =
                menstrualCycleCustomRepository.findThisMonthCycles(userId).orElse(null);

        List<MenstrualCycle> threeMonthsCycleList
                = menstrualCycleCustomRepository.findThreeMonthsCycles(userId).orElse(null);

        if (thisMonthCycleList == null || thisMonthCycleList.isEmpty()) {
            return ApiResponse.success("요약 리포트 정보로 제공할 최근 1개월 치의 주기 정보가 없습니다.");
        }

        if (threeMonthsCycleList == null || threeMonthsCycleList.isEmpty()) {
            return ApiResponse.success("요약 리포트 정보로 제공할 최근 3개월 치의 스트레스 정보가 없습니다.");
        }

        return ApiResponse.success("사용자의 요약 리포트 API입니다.", GetSummaryResDto.builder()
                .menstrual(
                        GetSummaryResDto.Menstrual.builder()
                                .normal(getSummary.getMenstrualNormal(thisMonthCycleList))
                                .bleeding_level(getSummary.getBleedingLevel(thisMonthCycleList))
                                .symptom(getSummary.getSymptoms(thisMonthCycleList))
                                .build()
                )
                .stress(
                        GetSummaryResDto.Stress.builder()
                                .normal(getSummary.getStressNormal(threeMonthsCycleList))
                                .stress(getSummary.getStressMessage(threeMonthsCycleList))
                                .build()
                )
                .build());
    }
}
