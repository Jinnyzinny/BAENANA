package com.ssafy.backend.menstrual.repository.custom;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface MenstrualCycleCustomRepository {
//    userId를 사용해서 주기 정보 열람(이때 log를 모두 같이 열람한다)
    List<MenstrualCycle> findMenstrualCycleByUser(User user);
    List<MenstrualCycle> findThisMonthCycles();
}
