package com.ssafy.backend.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.chat.dto.ChatMessageRequest;
import com.ssafy.backend.chat.dto.ChatResponse;
import com.ssafy.backend.chat.dto.ChatSessionDto;
import com.ssafy.backend.chat.dto.MessageDto;
import com.ssafy.backend.chat.entity.ChatMessages;
import com.ssafy.backend.chat.repository.ChatMessageRepository;
import com.ssafy.backend.chatbot.dto.ButtonDto;
import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.chatbot.service.ChatBotService;
import com.ssafy.backend.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatBotService chatBotService;
    private final ObjectMapper objectMapper;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Transactional
    public ChatResponse sendMessage(User user, ChatMessageRequest request) {
        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.isBlank()) {
            sessionId = UUID.randomUUID().toString();
        }

        LocalDateTime now = LocalDateTime.now();

        // 입력 유형 결정 (text 또는 button)
        String inputType = request.getInputType() != null ? request.getInputType() : "text";

        // Navigation 타입을 button으로 자동 변환
        if ("Navigation".equals(inputType)) {
            inputType = "button";
            log.info("Navigation 타입을 button으로 변환: {}", request.getMessage());
        }

        // 메시지(버튼 ID) 확인
        String message = request.getMessage();
        if (message == null || message.isEmpty()) {
            log.error("메시지 또는 버튼 ID가 null 또는 비어 있음");
            // 오류 응답 반환
            return new ChatResponse(sessionId, List.of(
                    new MessageDto(
                            "bot",
                            "메시지 또는 버튼 ID가 제공되지 않았습니다. 다시 시도해주세요.",
                            now.format(DATE_FORMATTER),
                            "text",
                            chatBotService.getMainButtons(),
                            "rule"
                    )
            ));
        }

        log.info("처리할 메시지: inputType={}, message={}, sessionId={}", inputType, message, sessionId);

        // 1. 사용자 메시지 저장
        ChatMessages userMessage = saveMessage(
                user,
                sessionId,
                "user",
                message,
                now,
                inputType,
                null,
                null
        );

        // 2. 챗봇 응답 생성
        ChatBotResponse botResponse;
        try {
            if ("button".equals(inputType)) {
                botResponse = chatBotService.handleButtonClick(user, message);

                // 로그에 버튼 ID와 응답 확인
                log.info("버튼 클릭 응답: buttonId={}, buttons={}",
                        message,
                        botResponse.getButtons() != null ? botResponse.getButtons().size() : 0);
            } else {
                ChatRequest chatRequest = ChatRequest.builder()
                        .inputType("text")
                        .content(message)
                        .sessionId(sessionId)
                        .build();
                botResponse = chatBotService.handleTextMessage(user, chatRequest);
            }

            // 세션 ID 유지
            if (botResponse.getSessionId() == null || botResponse.getSessionId().isEmpty() ||
                    "error".equals(botResponse.getSessionId())) {
                botResponse.setSessionId(sessionId);
            }
        } catch (Exception e) {
            log.error("챗봇 응답 생성 중 오류 발생", e);
            botResponse = ChatBotResponse.builder()
                    .sessionId(sessionId)
                    .message("죄송합니다. 처리 중 오류가 발생했습니다: " + e.getMessage())
                    .source("rule")
                    .buttons(chatBotService.getMainButtons())
                    .createdAt(LocalDateTime.now().format(DATE_FORMATTER))
                    .build();
        }

        // 3. 챗봇 메시지 저장 (버튼 정보 포함)
        String buttonDataJson = null;
        if (botResponse.getButtons() != null && !botResponse.getButtons().isEmpty()) {
            try {
                buttonDataJson = objectMapper.writeValueAsString(botResponse.getButtons());
            } catch (JsonProcessingException e) {
                log.error("버튼 데이터 직렬화 중 오류 발생", e);
            }
        }

        ChatMessages botMessage = saveMessage(
                user,
                sessionId,
                "bot",
                botResponse.getMessage(),
                now.plusSeconds(1),
                "text",
                buttonDataJson,
                botResponse.getSource()
        );

        // 4. 응답 구성
        MessageDto userMessageDto = convertToMessageDto(userMessage);
        MessageDto botMessageDto = convertToMessageDto(botMessage);

        // 버튼 정보 설정
        if (botResponse.getButtons() != null && !botResponse.getButtons().isEmpty()) {
            botMessageDto.setButtons(botResponse.getButtons());
        }

        List<MessageDto> messages = List.of(userMessageDto, botMessageDto);

        return new ChatResponse(sessionId, messages);
    }

    private ChatMessages saveMessage(
            User user,
            String sessionId,
            String sender,
            String message,
            LocalDateTime time,
            String inputType,
            String buttonData,
            String source
    ) {
        ChatMessages chat = new ChatMessages();
        chat.setUser(user);
        chat.setSessionId(sessionId);
        chat.setSender(sender);

        // message가 null인 경우 기본값으로 대체
        chat.setMessage(message != null ? message : "");

        chat.setCreatedAt(time);
        chat.setInputType(inputType);
        chat.setButtonData(buttonData);
        chat.setSource(source);
        return chatMessageRepository.save(chat);
    }

    public List<ChatSessionDto> getUserSessions(User user) {
        // 1. 사용자의 모든 메시지 중 sender == "user" 인 것만 필터링
        List<ChatMessages> userMessages = chatMessageRepository.findByUser(user).stream()
                .filter(msg -> "user".equals(msg.getSender()))
                .collect(Collectors.toList());

        // 2. 세션별로 마지막 user 메시지만 추출
        return userMessages.stream()
                .collect(Collectors.groupingBy(ChatMessages::getSessionId))
                .values().stream()
                .map(sessionMsgs -> sessionMsgs.stream()
                        .max(Comparator.comparing(ChatMessages::getCreatedAt))
                        .orElseThrow())
                .map(msg -> new ChatSessionDto(
                        msg.getSessionId(),
                        msg.getMessage(),
                        msg.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                ))
                .sorted((a, b) -> b.getLastTime().compareTo(a.getLastTime()))
                .collect(Collectors.toList());
    }

    public List<MessageDto> getSessionMessages(User user, String sessionId) {
        List<ChatMessages> messages = chatMessageRepository
                .findByUserAndSessionIdOrderByCreatedAt(user, sessionId);

        return messages.stream()
                .map(this::convertToMessageDto)
                .collect(Collectors.toList());
    }

    /**
     * ChatMessages 엔티티를 MessageDto로 변환
     */
    private MessageDto convertToMessageDto(ChatMessages message) {
        MessageDto dto = new MessageDto();
        dto.setSender(message.getSender());
        dto.setMessage(message.getMessage());
        dto.setCreatedAt(message.getCreatedAt().format(DATE_FORMATTER));
        dto.setInputType(message.getInputType());
        dto.setSource(message.getSource());

        // 버튼 데이터가 있으면 JSON에서 버튼 목록으로 변환
        if (message.getButtonData() != null && !message.getButtonData().isEmpty()) {
            try {
                List<ButtonDto> buttons = objectMapper.readValue(
                        message.getButtonData(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, ButtonDto.class)
                );
                dto.setButtons(buttons);
            } catch (JsonProcessingException e) {
                log.error("버튼 데이터 역직렬화 중 오류 발생", e);
            }
        }

        return dto;
    }
}