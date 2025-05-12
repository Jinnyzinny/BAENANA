package com.ssafy.backend.ovulation_test.entity;

import com.ssafy.backend.user.entity.User;
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
public class OvulationTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ovulationTestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate date;
    private double value;
}
