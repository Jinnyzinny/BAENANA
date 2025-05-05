package com.ssafy.backend.menstrual.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.menstrual.dto.repository.GetMaxCycleAndMinCycle;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.QMenstrualCycle;
import com.ssafy.backend.menstrual.entity.QMenstrualDailyLog;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class MenstrualCycleCustomRepositoryImpl implements MenstrualCycleCustomRepository {
    private final JPAQueryFactory queryFactory;
    QMenstrualCycle menstrualCycle = QMenstrualCycle.menstrualCycle;
    QMenstrualDailyLog menstrualDailyLog = QMenstrualDailyLog.menstrualDailyLog;

    public List<MenstrualCycle> findMenstrualCycleByUser(User user) {
        return queryFactory.selectDistinct(menstrualCycle)
                .from(menstrualCycle)
                .leftJoin(menstrualCycle.logs, menstrualDailyLog).fetchJoin()
                .where(menstrualCycle.user.userId.eq(user.getUserId())) // ← 필요한 조건으로 수정
                .fetch();
    }
}
