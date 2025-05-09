package com.ssafy.backend.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChatResponse {
    private String sessionId;
    private List<MessageDto> messages;
}