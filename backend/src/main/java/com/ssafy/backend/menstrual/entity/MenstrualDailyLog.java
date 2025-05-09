package com.ssafy.backend.menstrual.entity;

import com.ssafy.backend.symptom.entity.SymptomLog;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "menstrualDailyLog")
    private Set<SymptomLog> symptomLog;

    /*
     * =====Column=====
     * */
    private LocalDate date;
    private int bleedingLevel;
    private int painLevel;
    private Boolean isStart;
    private Boolean isEnd;
}