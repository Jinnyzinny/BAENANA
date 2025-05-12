package com.ssafy.backend.ovulation_test.repository.custom;

import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Repository
@Transactional
public interface OvulationTestCustomRepository {
    Optional<Map<LocalDate, Double>> findByUserAndDateAfter(User user, LocalDate date);
}
