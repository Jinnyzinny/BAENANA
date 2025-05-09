package com.ssafy.backend.chat.dto;

import lombok.Getter;

@Getter
public class ChatMessageRequest {
    private String sessionId;
    private String message;
}