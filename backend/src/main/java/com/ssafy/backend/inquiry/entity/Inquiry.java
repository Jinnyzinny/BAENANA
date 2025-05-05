package com.ssafy.backend.inquiry.entity;

import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiry")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_id")
    private Long inquiryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "question_content", nullable = false, columnDefinition = "TEXT")
    private String questionContent;

    @CreatedDate
    @Column(name = "question_date", updatable = false)
    private LocalDateTime questionDate;

    @Column(name = "answer_content", columnDefinition = "TEXT")
    private String answerContent;

    @Column(name = "answer_date")
    private LocalDateTime answerDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answered_by")
    private User answeredBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private InquiryStatus status;

    // 문의사항 상태 enum
    public enum InquiryStatus {
        PENDING, ANSWERED
    }

    // 문의사항 수정 메서드
    public void update(String title, String questionContent) {
        this.title = title;
        this.questionContent = questionContent;
    }

    // 답변 등록 메서드
    public void addAnswer(String answerContent, User answeredBy) {
        this.answerContent = answerContent;
        this.answerDate = LocalDateTime.now();
        this.answeredBy = answeredBy;
        this.status = InquiryStatus.ANSWERED;
    }

    // 답변 수정 메서드
    public void updateAnswer(String answerContent) {
        this.answerContent = answerContent;
        this.answerDate = LocalDateTime.now();
    }

    // 답변 삭제 메서드
    public void removeAnswer() {
        this.answerContent = null;
        this.answerDate = null;
        this.answeredBy = null;
        this.status = InquiryStatus.PENDING;
    }

    // 답변 여부 확인 메서드
    public boolean isAnswered() {
        return this.status == InquiryStatus.ANSWERED;
    }
}