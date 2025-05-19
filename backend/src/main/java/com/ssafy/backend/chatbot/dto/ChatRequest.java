package com.ssafy.backend.chatbot.dto;

import lombok.*;

import java.util.Map;

/**
 * AI 서비스로 전송되는 요청 DTO
 * 버튼 입력 또는 텍스트 입력을 처리할 수 있음
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    /**
     * 입력 유형 ("button" 또는 "text")
     */
    private String inputType;

    /**
     * 입력 내용 (버튼 ID 또는 사용자 텍스트)
     */
    private String content;

    /**
     * 대화 세션 ID
     */
    private String sessionId;

    /**
     * 사용자 건강 데이터 (맞춤형 응답 위한 생리주기, 증상, 의약품 등)
     */
    private Map<String, Object> userData;
}