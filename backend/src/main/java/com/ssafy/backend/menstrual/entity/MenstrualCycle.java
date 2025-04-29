package com.ssafy.backend.menstrual.entity;

import com.ssafy.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
