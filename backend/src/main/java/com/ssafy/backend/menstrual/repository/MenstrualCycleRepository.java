package com.ssafy.backend.menstrual.repository;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface MenstrualCycleRepository extends JpaRepository<MenstrualCycle,Long> {
    /*특정 날짜를 주고 시작일 뒤와  */
    Optional<MenstrualCycle> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate startDate, LocalDate EndDate);

    Optional<MenstrualCycle> findFirstByUser_UserIdOrderByStartDateDesc(Long user_userId);
}
