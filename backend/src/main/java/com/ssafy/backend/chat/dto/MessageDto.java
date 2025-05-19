package com.ssafy.backend.chat.dto;

import com.ssafy.backend.chatbot.dto.ButtonDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private String sender;
    private String message;
    private String createdAt;

    // 추가: 입력 유형 (text 또는 button)
    private String inputType;

    // 추가: 버튼 목록
    private List<ButtonDto> buttons;

    // 추가: 메시지 소스 (rule 또는 rag)
    private String source;

    // 기존 생성자 유지 (이전 코드와의 호환성)
    public MessageDto(String sender, String message, String createdAt) {
        this.sender = sender;
        this.message = message;
        this.createdAt = createdAt;
        this.inputType = "text";
        this.buttons = null;
        this.source = null;
    }
}