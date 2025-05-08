package com.ssafy.backend.medication.repository.custom;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationCustomRepository {
    List<Medication> findMedicationByUserId(Long userId);
    List<Medication> findTodayMedicationByUserId(Long userId);
}
