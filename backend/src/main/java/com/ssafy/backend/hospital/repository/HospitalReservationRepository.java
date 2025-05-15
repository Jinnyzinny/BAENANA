package com.ssafy.backend.hospital.repository;

import com.ssafy.backend.hospital.entity.HospitalReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalReservationRepository extends JpaRepository<HospitalReservation, Long> {
    /*
     *특정 날짜 2개 사이의 병원 예약 리스트를 불러온다
     */
    Optional<List<HospitalReservation>> findByUser_UserIdAndReservationDateBetween(Long user_userId, LocalDateTime reservationDate, LocalDateTime reservationDate2);

    /*
     * 특정 날짜 이후의 특정 날짜와 가장 가까운 첫번쨰 원소를 가져온다.
     * */
    Optional<HospitalReservation> findFirstByUser_UserIdAndReservationDateAfterOrderByReservationDate(Long userUserId, LocalDateTime reservationDateAfter);
}
