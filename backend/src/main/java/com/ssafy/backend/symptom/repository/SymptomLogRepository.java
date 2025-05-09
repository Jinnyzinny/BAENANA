package com.ssafy.backend.symptom.repository;

import com.ssafy.backend.symptom.entity.SymptomLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SymptomLogRepository extends JpaRepository<SymptomLog, Long> {
    Optional<SymptomLog> findByMenstrualDailyLog_DailyId(Long dailyId);
}
