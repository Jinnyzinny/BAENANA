package com.ssafy.backend.calendar.repository.cycle;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MenstrualCycleRepository extends JpaRepository<MenstrualCycle,Long> {
    Optional<MenstrualCycle> findFirstByUser_UserIdOrderByStartDateDesc(Long user_userId);
}
