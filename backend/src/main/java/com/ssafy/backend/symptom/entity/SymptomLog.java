package com.ssafy.backend.symptom.entity;

import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import java.time.LocalDate;

@Entity
@Getter
public class SymptomLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long symptomId;
    /*
    * =====연관 관계=====
    * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MenstrualDailyLog menstrualDailyLog;

    /*
     * =====Column=====
     * */
    private LocalDate date;
    @Convert(converter = SymptomTypeConverter.class)
    private SymptomType symptom;
    private Integer Severity;
    private String memo;
}
