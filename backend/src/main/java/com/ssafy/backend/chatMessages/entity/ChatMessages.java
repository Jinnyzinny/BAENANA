package com.ssafy.backend.chatMessages.entity;

import com.ssafy.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(indexes = {
        @Index(name = "session", columnList = "session_id")
})
public class ChatMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    /*
     * ===== 연관 관계 =====
     * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /*
     * ===== Column =====
     * */

    private String sender;
    private String message;
    private LocalDateTime createdAt;
    private String sessionId;
}
