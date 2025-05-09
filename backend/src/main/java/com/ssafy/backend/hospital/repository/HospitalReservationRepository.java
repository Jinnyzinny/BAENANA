package com.ssafy.backend.hospital.repository;

import com.ssafy.backend.hospital.entity.HospitalReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalReservationRepository extends JpaRepository<HospitalReservation, Long> {
    Optional<List<HospitalReservation>> findByUser_UserIdAndReservationDateBetween(Long user_userId, LocalDateTime reservationDate, LocalDateTime reservationDate2);

    Optional<HospitalReservation> findFirstByUser_UserIdAndReservationDateAfterOrderByReservationDate(Long userUserId, LocalDateTime reservationDateAfter);
}
