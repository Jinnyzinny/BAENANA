package com.ssafy.backend.menstrual.repository.custom;

import com.ssafy.backend.menstrual.dto.response.GetMenstrualCycleResDto;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface MenstrualCycleCustomRepositroy {
    List<MenstrualCycle> findMenstrualCycleByUser(User user);
}
