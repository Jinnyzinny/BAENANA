package com.ssafy.backend.menstrual.repository;

import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MenstrualDailyLogRepository extends JpaRepository<MenstrualDailyLog, Long> {
//    CycleId와 날짜를 이용해서 일일 세부 증상을 열람한다.
    Optional<MenstrualDailyLog> findByCycle_User_UserIdAndDate(Long userId, LocalDate date);


}
