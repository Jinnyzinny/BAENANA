package com.ssafy.backend.healthInfo.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * =====연관 관계=====
     * */
    @OneToMany(mappedBy = "category")
    private List<HealthInfo> healthInfoList;

    /*
     * =====Column=====
     * */
    private String name;
    private String description;
    private LocalDateTime createdAt;
}
