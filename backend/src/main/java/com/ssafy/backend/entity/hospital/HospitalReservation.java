package com.ssafy.backend.entity.hospital;

import com.ssafy.backend.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
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
//    private Enum purpose;
//    private Enum status;
}
