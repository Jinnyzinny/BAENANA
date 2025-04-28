package com.ssafy.backend.auth.entity;

import com.ssafy.backend.chatMessages.entity.ChatMessages;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.inquiry.entity.Inquiry;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.symptom.entity.SymptomLog;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    /*
    * =====연관 관계=====
    * */
    @OneToMany(mappedBy = "user")
    private List<MenstrualCycle> cycles;

    @OneToMany(mappedBy = "user")
    private List<HospitalReservation> hospitalReservations;

    @OneToMany(mappedBy = "user")
    private List<SymptomLog> symptomLogs;

    @OneToMany(mappedBy = "user")
    private List<Medication> medications;

    @OneToMany(mappedBy = "user")
    private List<Inquiry> inquiries;

    @OneToMany(mappedBy = "user")
    private List<ChatMessages> chatMessages;

    /*
    * =====Column=====
    * */
    private String socialId;
    private String provider;
    private String role;
    private Boolean allowAlarm;
    private LocalDateTime createdAt;
    private Boolean isDeleted;
    private LocalDateTime deletedAt;
}
