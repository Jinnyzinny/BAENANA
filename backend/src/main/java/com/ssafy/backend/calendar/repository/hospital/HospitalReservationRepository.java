package com.ssafy.backend.calendar.repository.hospital;

import com.ssafy.backend.hospital.entity.HospitalReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalReservationRepository extends JpaRepository<HospitalReservation, Long> {
    Optional<List<HospitalReservation>> findHospitalReservationByUser_UserId(Long userId);
}
