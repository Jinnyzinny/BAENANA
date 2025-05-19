package com.ssafy.backend.chatbot.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
public class ChatRequest {
    private String inputType;  // "button", "text"
    private String content;    // 버튼 ID 또는 텍스트 입력
    private String sessionId;  // 세션 ID (첫 요청에서는 null 가능)
    private Map<String, Object> userData;  // 사용자 데이터 추가
}