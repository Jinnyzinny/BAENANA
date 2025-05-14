package com.ssafy.backend.menstrual.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.entity.QMenstrualCycle;
import com.ssafy.backend.menstrual.entity.QMenstrualDailyLog;
import com.ssafy.backend.symptomLog.entity.QSymptomLog;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@Transactional
@RequiredArgsConstructor
public class MenstrualCycleCustomRepositoryImpl implements MenstrualCycleCustomRepository {
    private final JPAQueryFactory queryFactory;
    QMenstrualCycle menstrualCycle = QMenstrualCycle.menstrualCycle;
    QMenstrualDailyLog menstrualDailyLog = QMenstrualDailyLog.menstrualDailyLog;
    QSymptomLog symptomLog = QSymptomLog.symptomLog;

    public List<MenstrualCycle> findMenstrualCycleByUser(User user) {
        return queryFactory.selectDistinct(menstrualCycle)
                .from(menstrualCycle)
                .leftJoin(menstrualCycle.logs, menstrualDailyLog).fetchJoin()
                .leftJoin(menstrualDailyLog.symptomLog, symptomLog).fetchJoin()
                .where(menstrualCycle.user.userId.eq(user.getUserId())) // ← 필요한 조건으로 수정
                .distinct()
                .fetch().stream()
                .peek(cycle -> {
                    // 로그 리스트를 ID 기준으로 중복 제거
                    List<MenstrualDailyLog> distinctLogs = cycle.getLogs().stream()
                            .distinct() // 로그 객체 자체의 중복 제거
                            .collect(Collectors.toList());
                    cycle.setLogs(distinctLogs); // 중복 제거된 로그로 설정
                })
                .collect(Collectors.toList());
    }

    public Optional<List<MenstrualCycle>> findThisMonthCycles(Long userId) {
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());

        return Optional.ofNullable(queryFactory
                .selectFrom(menstrualCycle)
                .leftJoin(menstrualCycle.logs, menstrualDailyLog).fetchJoin()   // Cycle -> DailyLog
                .leftJoin(menstrualDailyLog.symptomLog, symptomLog).fetchJoin()     // DailyLog -> SymptomLog
                .where(
                        menstrualCycle.user.userId.eq(userId)
                                .and(menstrualCycle.startDate.between(startOfMonth, endOfMonth)
                                        .or(menstrualCycle.endDate.between(startOfMonth, endOfMonth))
                                )

                )
                .distinct()
                .fetch());
    }

    @Override
    public Optional<List<MenstrualCycle>> findThreeMonthsCycles(Long userId) {
        LocalDate startOfMonth = LocalDate.now().minusMonths(2).withDayOfMonth(1);
        LocalDate endOfMonth = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());

        return Optional.ofNullable(queryFactory
                .selectFrom(menstrualCycle)
                .leftJoin(menstrualCycle.logs, menstrualDailyLog).fetchJoin()   // Cycle -> DailyLog
                .leftJoin(menstrualDailyLog.symptomLog, symptomLog).fetchJoin()     // DailyLog -> SymptomLog
                .where(
                        menstrualCycle.user.userId.eq(userId)
                                .and(
                                        menstrualCycle.startDate.between(startOfMonth, endOfMonth)
                                                .or(menstrualCycle.endDate.between(startOfMonth, endOfMonth))
                                )
                )
                .distinct()
                .fetch());
    }

    @Override
    public Optional<List<MenstrualCycle>> findMonthlyCycle(Long userId, int year, int month) {
        LocalDate firstDay = LocalDate.of(year, month, 1);
        LocalDate lastDay = firstDay.with(TemporalAdjusters.lastDayOfMonth());

        QMenstrualDailyLog dl = QMenstrualDailyLog.menstrualDailyLog;
        QSymptomLog sl = QSymptomLog.symptomLog;
        QMenstrualCycle mc = QMenstrualCycle.menstrualCycle;

        List<MenstrualCycle> result = queryFactory
                .selectDistinct(mc)
                .from(mc)
                .leftJoin(mc.logs, dl).fetchJoin()
                .leftJoin(dl.symptomLog, sl).fetchJoin()
                .where(
                        mc.user.userId.eq(userId),
                        mc.startDate.loe(lastDay),   // 시작일이 해당 월의 마지막 날보다 이전
                        mc.endDate.goe(firstDay)     // 종료일이 해당 월의 첫 날보다 이후
                )
                .orderBy(mc.startDate.asc())
                .fetch();

        return Optional.ofNullable(result.isEmpty() ? null : result);
    }
}
