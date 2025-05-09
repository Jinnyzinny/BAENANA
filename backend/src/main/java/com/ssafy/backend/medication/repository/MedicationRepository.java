package com.ssafy.backend.medication.repository;

import com.ssafy.backend.medication.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication,Long> {
//    약 이름과 사용자 ID로 사용자가 복용한 특정 의약품을 찾는다.
    Optional<Medication> findByNameAndUser_UserId(String medication_name, Long userId);
//    사용자가 복용한 의약품 리스트를 찾는다
    Optional<List<Medication>> findByUser_UserId(Long userUserId);

    Optional<List<Medication>> findDistinctByUser_UserIdAndEndDateAfter(Long userId, LocalDate endDate);
    Optional<List<Medication>> findDistinctByUser_UserIdAndEndDateBefore(Long userId, LocalDate endDate);

    //    Primary Key로 사용자가 복용한 의약품을 찾는다.
    Optional<Medication> findByMedicationId(Long id);
}
