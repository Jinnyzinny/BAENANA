package com.ssafy.backend.entity.symptom;

import com.ssafy.backend.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

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
    @JoinColumn(name = "user_id")
    private User user;

    /*
     * =====Column=====
     * */
    private LocalDate date;
//    private Enum<> symptomType;
    private Integer Severity;
    private String memo;
}
