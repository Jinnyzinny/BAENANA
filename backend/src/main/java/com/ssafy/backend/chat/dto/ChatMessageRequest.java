package com.ssafy.backend.chat.dto;

import com.ssafy.backend.chatbot.dto.ButtonDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {
    private String sessionId;
    private String message;       // 사용자 메시지 또는 버튼 ID
    private String content;       // 'message'와 동일한 역할 (호환성 유지)
    private String inputType;     // "text" 또는 "button" 또는 "Navigation"

    // getter 메소드 오버라이드: content 필드가 null이 아니면 content 반환, 그렇지 않으면 message 반환
    public String getMessage() {
        return content != null ? content : message;
    }
}