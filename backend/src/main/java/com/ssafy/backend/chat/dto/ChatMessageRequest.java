package com.ssafy.backend.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequest {
    private String sessionId;
    private String message;
    private String inputType; // "text" 또는 "button"
}