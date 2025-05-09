package com.ssafy.backend.medication.repository.custom;

import com.querydsl.jpa.JPAExpressions;
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
    public List<Medication> findMedicationByUserId(Long userId) {
        return queryFactory
                .selectFrom(medication)
                .leftJoin(medication.timeTakenList, timeTaken).fetchJoin()
                .where(medication.user.userId.eq(userId))
                .distinct()
                .orderBy(medication.startDate.desc(), timeTaken.time_taken.asc())
                .fetch();
    }
}
