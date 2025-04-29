package com.ssafy.backend.calendar.repository.cycle;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CycleRepository extends JpaRepository<MenstrualCycle,Long> {
}
