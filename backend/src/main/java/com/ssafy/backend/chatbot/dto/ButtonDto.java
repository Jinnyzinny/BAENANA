package com.ssafy.backend.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 챗봇 UI에 표시되는 버튼 정보 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ButtonDto {
    /**
     * 버튼 ID (백엔드와 AI 서비스에서 사용)
     * 예: "hormone_balance", "next_period", "back_to_main"
     */
    private String id;

    /**
     * 버튼에 표시될 텍스트
     * 예: "호르몬 균형 관리", "다음 월경일 예측", "처음으로"
     */
    private String text;

    /**
     * 버튼 유형 (선택 사항)
     * 예: "RAG", "Rule", "Navigation"
     */
    private String type;

    /**
     * 상위 버튼 ID (선택 사항)
     * 계층 구조 표현 시 사용
     */
    private String parentId;
}