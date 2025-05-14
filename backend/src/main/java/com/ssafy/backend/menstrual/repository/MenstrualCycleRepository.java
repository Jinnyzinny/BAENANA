package com.ssafy.backend.menstrual.repository;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MenstrualCycleRepository extends JpaRepository<MenstrualCycle,Long> {
    //사용자의 주기 전체를 찾는다.
    Optional<List<MenstrualCycle>> findByUser_UserId(Long userId);
//    사용자의 주기 전체를 찾는다
    Optional<List<MenstrualCycle>> findByUser_UserIdOrderByStartDateDesc(Long userId);
//    사용자의 주기 중 최근 6개월만 찾는다
    Optional<List<MenstrualCycle>> findTop6ByUser_UserIdOrderByStartDateDesc(Long userId);
    //    사용자의 주기 중 최근 4개월만 찾는다(3개의 주기를 뽑아내기 위해서)
    Optional<List<MenstrualCycle>> findTop4ByUser_UserIdOrderByStartDateDesc(Long userId);
    /*특정 날짜를 주고 시작일 뒤와  */
    Optional<List<MenstrualCycle>> findByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(Long userId, LocalDate startDate, LocalDate endDate);

    /*특정 날짜를 주고 구간 하나  */
    Optional<MenstrualCycle> findFirstByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqualOrderByStartDateDesc(Long userId, LocalDate startDate, LocalDate endDate);


    Optional<MenstrualCycle> findFirstByUser_UserIdOrderByStartDateDesc(Long user_userId);

    Optional<MenstrualCycle> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate startDate, LocalDate endDate);
}
