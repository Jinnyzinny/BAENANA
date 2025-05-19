package com.ssafy.backend.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatBotResponse {
    private String sessionId;
    private String message;
    private String source;  // "rule" 또는 "rag"
    private List<ButtonDto> buttons;
    private String userMessage;
    private String createdAt;

    public static ChatBotResponse create(String sessionId, String message, String source,
                                         List<ButtonDto> buttons, String userMessage) {
        return new ChatBotResponse(
                sessionId,
                message,
                source,
                buttons,
                userMessage,
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }
}
