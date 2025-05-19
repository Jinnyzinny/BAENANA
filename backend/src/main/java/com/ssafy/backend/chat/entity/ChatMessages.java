package com.ssafy.backend.chat.entity;

import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(indexes = {@Index(name = "session", columnList = "session_id")})
public class ChatMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;
    private String sender;
    private String message;
    private LocalDateTime createdAt;
    private String sessionId;

    // 추가: 입력 유형 (text 또는 button)
    @Column(name = "input_type")
    private String inputType;

    // 추가: 버튼 데이터 (JSON 형태로 저장)
    @Column(name = "button_data", columnDefinition = "TEXT")
    private String buttonData;

    // 추가: 메시지 소스 (rule 또는 rag)
    @Column(name = "source")
    private String source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
