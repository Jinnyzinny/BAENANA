package com.ssafy.backend.entity.menstrual;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class MenstrualDailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dailyId;

    /*
     * =====연관 관계=====
     * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cycle_id")
    private MenstrualCycle cycle;

    /*
     * =====Column=====
     * */
    private LocalDate date;
    //    private Enum bleedingLevel;
    private int painLevel;
    private Boolean isStart;
    private Boolean isEnd;
}