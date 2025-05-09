package com.ssafy.backend.hospital.repository;

import com.ssafy.backend.hospital.entity.HospitalReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalReservationRepository extends JpaRepository<HospitalReservation, Long> {
    Optional<List<HospitalReservation>> findHospitalReservationByUser_UserId(Long userId);

    Optional<HospitalReservation> findFirstByUser_UserIdAndReservationDateAfterOrderByReservationDate(Long userUserId, LocalDateTime reservationDateAfter);

    Optional<HospitalReservation> findByUser_UserIdAndReservationDate(Long UserId, LocalDateTime reservationDate);
}
