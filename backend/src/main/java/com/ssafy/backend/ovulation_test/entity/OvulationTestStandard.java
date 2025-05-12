package com.ssafy.backend.ovulation_test.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OvulationTestStandard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long standardId;

    private int type;
    private int date;
    private double value;
}
