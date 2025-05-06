package com.ssafy.backend.medication.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.MedicationLog;
import com.ssafy.backend.medication.entity.QMedication;
import com.ssafy.backend.medication.entity.QMedicationLog;
import com.ssafy.backend.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
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
        List<Medication> result = queryFactory
                .selectFrom(medication)
                .leftJoin(medication.medicationLogList, medicationLog).fetchJoin()
                .where(medication.user.userId.eq(userId))
                .distinct() // ← 중복 제거 필수!
                .fetch();

        result.forEach(med ->
                med.getMedicationLogList().sort(Comparator.comparing(MedicationLog::getDate).reversed())
        );
        return result;
    }
}
