package com.ssafy.backend.menstrual.repository;

import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MenstrualDailyLogRepository extends JpaRepository<MenstrualDailyLog, Long> {

    Optional<MenstrualDailyLog> findMenstrualDailyLogByCycle_CycleIdAndDate(Long cycleId, LocalDate date);
}
