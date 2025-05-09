package com.ssafy.backend.medication.entity;

import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;

    /*
    * =====연관 관계=====
    * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "medication")
    private List<MedicationLog> medicationLogList;

    @OneToMany(mappedBy = "medication")
    private List<TimeTaken> timeTakenList;

    /*
    *  =====Column=====
    * */
    private String name;
    private String defaultDose;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
