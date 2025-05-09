package com.ssafy.backend.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatSessionDto {
    private String sessionId;
    private String lastMessage;
    private String lastTime;
}