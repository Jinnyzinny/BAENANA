package com.ssafy.backend.hospital.entity;

import com.ssafy.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /*
     * =====Column=====
     * */
    private String hospitalName;
    private LocalDateTime reservationDate;

    @Enumerated(EnumType.STRING)
    private PurposeType purpose;
    /*
    * 산부인과
    * 정기검진
    * */
    @Enumerated(EnumType.STRING)
    private StatusType status;
    /*
    * 예약됨
    * 완료됨
    * */
}
