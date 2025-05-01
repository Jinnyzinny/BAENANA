package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication,Long> {
    Optional<Medication> findByNameAndUser_UserId(String medication_name, Long userId);

    Optional<List<Medication>> findByUser_UserId(Long userUserId);

    Optional<Medication> findByMedicationId(Long id);
}
