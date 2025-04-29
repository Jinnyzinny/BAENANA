package com.ssafy.backend.medication.entity;

import com.ssafy.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

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

    /*
    *  =====Column=====
    * */
    private String name;
    private String defaultDose;
    private String description;
}
