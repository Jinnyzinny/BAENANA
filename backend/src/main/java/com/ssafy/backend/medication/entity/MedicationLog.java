package com.ssafy.backend.medication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medication_id")
    private Medication medication;


    private LocalDate date;
    private LocalTime time_taken;
    private String dose;
    private String memo;
}
