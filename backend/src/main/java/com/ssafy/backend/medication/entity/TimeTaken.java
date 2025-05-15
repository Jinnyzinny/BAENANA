package com.ssafy.backend.medication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeTaken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timeTakenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medication_id")
    private Medication medication;

    private LocalTime time_taken;
}
