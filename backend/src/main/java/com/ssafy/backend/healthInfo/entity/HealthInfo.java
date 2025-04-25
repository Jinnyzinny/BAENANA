package com.ssafy.backend.healthInfo.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class HealthInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
    * =====연관 관계=====
    * */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    /*
    * =====Column=====
    * */
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
}
