package com.ssafy.backend.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * AI 서비스에서 반환되는 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatBotResponse {
    /**
     * 대화 세션 ID
     */
    private String sessionId;

    /**
     * 챗봇 응답 메시지
     */
    private String message;

    /**
     * 응답 소스 (rule: 규칙 기반, rag: RAG 기반)
     */
    private String source;

    /**
     * 후속 버튼 목록
     */
    private List<ButtonDto> buttons;

    /**
     * 사용자 메시지 (요청 내용)
     */
    private String userMessage;

    /**
     * 응답 생성 시간
     */
    private String createdAt;
}