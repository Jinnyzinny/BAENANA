package com.ssafy.backend.menstrual.repository;

import com.ssafy.backend.menstrual.entity.symptom.SymptomLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SymptomLogRepository extends JpaRepository<SymptomLog, Long> {
    Optional<SymptomLog> findByMenstrualDailyLog_DailyId(Long dailyId);
}
