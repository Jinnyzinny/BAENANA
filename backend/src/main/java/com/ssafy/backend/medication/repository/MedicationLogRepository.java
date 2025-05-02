package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.MedicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationLogRepository extends JpaRepository<MedicationLog,Long> {
    Optional<List<MedicationLog>> findByMedication_MedicationIdOrderByDateDesc(Long medicationMedicationId);
}
