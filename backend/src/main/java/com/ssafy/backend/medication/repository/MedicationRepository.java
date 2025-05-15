package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication,Long> {
    /*
    * Date1 이전에 start_date 값이 속하거나 Date2 이후에 end_date 값이 속하는 것들을 중복을 제거해 리스트로 반환
    * 여기서는 Date1에 달의 마지막 날, Date2에 달의 첫 날을 넣는다.
    * 그래야 해당 월에 걸치는 모든 주기를 불러올 수 있다.
    * */
    Optional<List<Medication>> findDistinctByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(Long userId,LocalDate startDate, LocalDate endDate);
    //    Primary Key로 사용자가 복용한 의약품을 찾는다.
    Optional<Medication> findByMedicationId(Long id);
}
