package com.ssafy.backend.medication.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.QMedication;
import com.ssafy.backend.medication.entity.QMedicationLog;
import com.ssafy.backend.medication.entity.QTimeTaken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class MedicationImplCustomRepository implements MedicationCustomRepository {
    private final JPAQueryFactory queryFactory;

    QMedicationLog medicationLog = QMedicationLog.medicationLog;
    QMedication medication = QMedication.medication;
    QTimeTaken timeTaken = QTimeTaken.timeTaken;

    @Override
    public List<Medication> findMedicationByUserId(Long userId) {
        return queryFactory
                .selectFrom(medication)
                .leftJoin(medication.timeTakenList, timeTaken).fetchJoin()
                .where(medication.user.userId.eq(userId))
                .distinct()
                .orderBy(medication.startDate.desc(), timeTaken.time_taken.asc())
                .fetch();
    }

    @Override
    public List<Medication> findTodayMedicationByUserId(Long userId) {
//        복용 종료일이 오늘 이후인 사용자가 복용한 약물 리스트를 이름 별로 뽑아오는 것
        return queryFactory
                .selectFrom(medication)
                .distinct()
                .where(medication.endDate.goe(LocalDate.now())
                        .and(medication.user.userId.eq(userId))
                )
                .leftJoin(medication.medicationLogList, medicationLog).fetchJoin()
                .groupBy(medication.name)
                .fetch();
    }
}
