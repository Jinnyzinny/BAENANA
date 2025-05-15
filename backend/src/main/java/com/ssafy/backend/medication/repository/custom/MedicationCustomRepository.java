package com.ssafy.backend.medication.repository.custom;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationCustomRepository {
    Optional<List<Medication>> findMedicationByUserId(Long userId);

    Optional<List<Medication>> findThisMonthMedicationByUserId(Long userId, int year, int month);
}
