package com.ssafy.backend.report.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.report.dto.response.GetAlarmResDto;
import com.ssafy.backend.report.dto.response.GetSummaryResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;

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

    @Override
    public ApiResponse<?> getSummary(User user) {
        /*
         * userId를 얻는다.
         * */
        Long userId = user.getUserId();

        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository.findByCycle_User_UserIdAndDate(userId, LocalDate.now()).orElse(null);

        if (dailyLog == null) {
            return ApiResponse.success("요약할 정보가 없습니다.");
        }

        return ApiResponse.success("", GetSummaryResDto.builder()
//                .menstrual(
//                        GetSummaryResDto.Menstrual.builder()
//                                .anomal()
//                                .bleeding_level(dailyLog.getBleedingLevel())
//                                .symptom()
//                                .build()
//                )
//                .stress(
//                        GetSummaryResDto.Stress.builder()
//                                .anomal()
//                                .stress()
//                                .build()
//                )
                .build());
    }
}
