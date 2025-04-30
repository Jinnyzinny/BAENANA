package com.ssafy.backend.calendar.repository.medication;

import com.ssafy.backend.medication.entity.MedicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicationLogRepository extends JpaRepository<MedicationLog,Long> {
    }
