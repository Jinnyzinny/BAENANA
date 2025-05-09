package com.ssafy.backend.chat.service;

import com.ssafy.backend.chat.dto.ChatMessageRequest;
import com.ssafy.backend.chat.dto.ChatResponse;
import com.ssafy.backend.chat.dto.MessageDto;
import com.ssafy.backend.chat.entity.ChatMessages;
import com.ssafy.backend.chat.repository.ChatMessageRepository;
import com.ssafy.backend.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public ChatResponse sendMessage(User user, ChatMessageRequest request) {
        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.isBlank()) {
            sessionId = UUID.randomUUID().toString();
        }

        LocalDateTime now = LocalDateTime.now();

        // 1. 사용자 메시지 저장
        ChatMessages userMessage = saveMessage(user, sessionId, "user", request.getMessage(), now);

        // 2. 챗봇 응답 생성 (TODO: 실제 챗봇 연동 예정)
        String botReply = getBotResponse(request.getMessage());

        // 3. 챗봇 메시지 저장
        ChatMessages botMessage = saveMessage(user, sessionId, "bot", botReply, now.plusSeconds(1));

        // ✅ 4. 방금 보낸 두 메시지만 응답
        List<MessageDto> messages = List.of(userMessage, botMessage).stream()
                .map(chat -> new MessageDto(
                        chat.getSender(),
                        chat.getMessage(),
                        chat.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                ))
                .collect(Collectors.toList());

        return new ChatResponse(sessionId, messages);
    }

    private ChatMessages saveMessage(User user, String sessionId, String sender, String message, LocalDateTime time) {
        ChatMessages chat = new ChatMessages();
        chat.setUser(user);
        chat.setSessionId(sessionId);
        chat.setSender(sender);
        chat.setMessage(message);
        chat.setCreatedAt(time);
        return chatMessageRepository.save(chat);
    }

    private String getBotResponse(String userMessage) {
        // TODO: 파이썬 챗봇 서버와 연동 예정
        return "챗봇 서버와 연동이 안 됐습니다.";
    }
}