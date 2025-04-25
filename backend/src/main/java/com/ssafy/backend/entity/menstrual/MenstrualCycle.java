package com.ssafy.backend.entity.menstrual;

import com.ssafy.backend.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
public class MenstrualCycle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cycleId;

    /*
    * =====연관 관계=====
    * */
    @OneToMany(mappedBy = "cycle")
    private List<MenstrualDailyLog> logs;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /*
    * =====Column=====
    * */
    private LocalDate startDate;
    private LocalDate endDate;
}
