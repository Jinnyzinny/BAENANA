package com.ssafy.backend.medication.repository.custom;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationCustomRepository {
    List<Medication> findMedicationByUserId(Long userId);
    List<Medication> findThisMonthMedicationByUserId(Long userId,int year,int month);
}
