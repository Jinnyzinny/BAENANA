package com.ssafy.backend.medication.repository.custom;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.QMedication;
import com.ssafy.backend.medication.entity.QMedicationLog;
import com.ssafy.backend.medication.entity.QTimeTaken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@RequiredArgsConstructor
public class MedicationImplCustomRepository implements MedicationCustomRepository {
    private final JPAQueryFactory queryFactory;

    QMedicationLog medicationLog = QMedicationLog.medicationLog;
    QMedication medication = QMedication.medication;
    QTimeTaken timeTaken = QTimeTaken.timeTaken;

    @Override
    public Optional<List<Medication>> findMedicationByUserId(Long userId) {
        /*
        * 의약품의 복용을 조회하되 중복을 제거하고 최근에서 과거로, 복용시간은 오름차순으로 조회해 약 정보와 복용 시간을 모두 조회할 수 있도록 한다.
        * */
        return Optional.of(queryFactory
                .selectFrom(medication)
                .leftJoin(medication.timeTakenList, timeTaken).fetchJoin()
                .where(medication.user.userId.eq(userId))
                .distinct()
                .orderBy(medication.startDate.asc(), timeTaken.time_taken.asc())
                .fetch());
    }

    @Override
    public Optional<List<Medication>> findThreeMonthMedicationByUserId(Long userId) {
        /*
         * 의약품의 복용을 조회하되 중복을 제거하고 최근에서 과거로, 복용시간은 오름차순으로 조회해 약 정보와 복용 시간을 모두 조회할 수 있도록 한다.
         * */
        return Optional.of(queryFactory
                .selectFrom(medication)
                .leftJoin(medication.timeTakenList, timeTaken).fetchJoin()
                .where(medication.user.userId.eq(userId)
                        .and(medication.startDate.goe(LocalDate.now().minusMonths(3)))
                )
                .distinct()
                .orderBy(medication.startDate.asc(), timeTaken.time_taken.asc())
                .fetch());
    }

    @Override
    public Optional<List<Medication>> findThisMonthMedicationByUserId(Long userId, int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = YearMonth.of(year, month).atEndOfMonth();

        // 여집합 조건: 이번 달과 겹치지 않는 경우 (제외할 조건)
        BooleanExpression excludeCondition =
                medication.endDate.lt(startOfMonth)    // 종료일이 이번 달 이전
                        .or(medication.startDate.gt(endOfMonth)); // 시작일이 이번 달 이후

        return Optional.of(queryFactory
                .selectFrom(medication)
                .leftJoin(medication.timeTakenList, timeTaken).fetchJoin()
                .where(
                        medication.user.userId.eq(userId)
                                .and(excludeCondition.not()) // 여집합 조건을 반전하여 이번 달과 겹치는 경우만 남기기
                )
                .distinct()
                .orderBy(medication.startDate.asc(), timeTaken.time_taken.asc())
                .fetch()
        );
    }
}
