package com.ssafy.backend.ovulation_test.repository;

import com.ssafy.backend.ovulation_test.entity.OvulationTestStandard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OvulationTestStandardRepository extends JpaRepository<OvulationTestStandard, Integer> {
    Optional<OvulationTestStandard> findByTypeOrderByDateAsc(int type);
}
