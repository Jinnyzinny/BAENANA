package com.ssafy.backend.calendar.repository;

import com.ssafy.backend.hospital.entity.HospitalReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalReservationRepository extends JpaRepository<HospitalReservation, Long> {
    Optional<List<HospitalReservation>> findHospitalReservationByUser_UserId(Long userId);
}
