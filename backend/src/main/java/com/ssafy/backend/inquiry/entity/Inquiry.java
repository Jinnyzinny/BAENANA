package com.ssafy.backend.inquiry.entity;

import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;

    /*
     * =====연관 관계=====
     * */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /*
     * =====Column=====
     * */
    private String title;
    private String questionContent;
    private LocalDateTime questionDate;
    private String answerContent;
    private LocalDateTime answerDate;
    private Long answeredBy;
//    private Enum<> status;
}
