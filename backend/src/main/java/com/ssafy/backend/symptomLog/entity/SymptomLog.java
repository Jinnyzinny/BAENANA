package com.ssafy.backend.symptomLog.entity;

import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SymptomLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long symptomId;
    /*
    * =====연관 관계=====
    * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_id")
    private MenstrualDailyLog menstrualDailyLog;

    /*
     * =====Column=====
     * */
    private LocalDate date;
    @Convert(converter = SymptomTypeConverter.class)
    private SymptomType symptomType;
    private Integer severity;
    private String memo;
}
