package com.ssafy.backend.ovulation_test.repository;

import com.ssafy.backend.ovulation_test.entity.OvulationTest;
import com.ssafy.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OvulationTestRepository extends JpaRepository<OvulationTest, Long> {
    Optional<List<OvulationTest>> findByUserAndDateAfter(User user, LocalDate date);
}
