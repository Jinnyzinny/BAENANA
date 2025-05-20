package com.ssafy.backend.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * FastAPI RAG 서비스에서 반환되는 응답을 위한 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RagServiceResponseDto {
    /**
     * AI 모델이 생성한 답변
     */
    private String answer;

    /**
     * 평가 지표 (유사도, 정확도 등)
     */
    private Map<String, Float> metrics;
}