package com.ssafy.backend.ovulation_test.repository.custom;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.ovulation_test.entity.QOvulationTest;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@Transactional
@RequiredArgsConstructor
public class OvulationTestCustomRepositoryImpl implements OvulationTestCustomRepository {
    private final JPAQueryFactory queryFactory;

    public Optional<Map<LocalDate, Double>> findByUserAndDateAfter(User user, LocalDate date) {
        Long userId = user.getUserId();
        QOvulationTest ovulationTest = QOvulationTest.ovulationTest;

        List<Tuple> results = queryFactory
                .select(ovulationTest.date, ovulationTest.value)
                .from(ovulationTest)
                .where(ovulationTest.user.userId.eq(userId)
                        .and(ovulationTest.date.goe(date)))
                .orderBy(ovulationTest.date.asc())
                .fetch();
        return Optional.of(results.stream()
                .collect(
                        Collectors.toMap(
                                tuple -> tuple.get(ovulationTest.date),
                                tuple -> tuple.get(ovulationTest.value),
                                (existing, replacement) -> existing // 중복 발생 시 기존 값 유지
                        )
                )
        );
    }
}
