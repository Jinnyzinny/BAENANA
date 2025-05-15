package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.MedicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationLogRepository extends JpaRepository<MedicationLog, Long> {
    /*
     * 의약품 ID로 최근에서 과거 순서대로 복용기록 리스트를 불러온다.
     */
    Optional<List<MedicationLog>> findByMedication_MedicationIdOrderByDateDesc(Long medicationMedicationId);
}
