package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.TimeTaken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeTakenRepository extends JpaRepository<TimeTaken, Long> {
}
