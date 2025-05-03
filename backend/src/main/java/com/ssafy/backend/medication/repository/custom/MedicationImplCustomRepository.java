package com.ssafy.backend.medication.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.user.entity.QUser;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.QMedication;
import com.ssafy.backend.medication.entity.QMedicationLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class MedicationImplCustomRepository implements MedicationCustomRepository {
    private final JPAQueryFactory queryFactory;

    QMedicationLog medicationLog = QMedicationLog.medicationLog;
    QMedication medication = QMedication.medication;
    QUser user = QUser.user;

    @Override
    public List<Medication> findMedicationByUserId(Long userId) {
        return queryFactory
                .select(medication)
                .from(medicationLog)
                .join(medicationLog.medication, medication).fetchJoin()
                .join(medication.user, user)
                .where(user.userId.eq(userId))
                .orderBy(medicationLog.date.desc())
                .distinct() // 중복 제거
                .fetch();
    }
}
