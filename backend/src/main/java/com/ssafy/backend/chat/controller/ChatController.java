package com.ssafy.backend.chat.controller;

import com.ssafy.backend.chat.dto.ChatMessageRequest;
import com.ssafy.backend.chat.dto.ChatResponse;
import com.ssafy.backend.chat.dto.ChatSessionDto;
import com.ssafy.backend.chat.dto.MessageDto;
import com.ssafy.backend.chat.service.ChatService;
import com.ssafy.backend.chatbot.dto.ButtonDto;
import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.service.ChatBotService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final ChatBotService chatBotService;

    @PostMapping("/message")
    public ApiResponse<ChatResponse> sendMessage(@AuthenticationPrincipal User user,
                                                 @RequestBody ChatMessageRequest request) {
        ChatResponse response = chatService.sendMessage(user, request);
        return ApiResponse.success("대화 전송에 성공했습니다.", HttpStatus.CREATED, response);
    }

    @GetMapping("/sessions")
    public ApiResponse<List<ChatSessionDto>> getUserSessions(@AuthenticationPrincipal User user) {
        List<ChatSessionDto> sessions = chatService.getUserSessions(user);
        return ApiResponse.success("세션 목록 조회에 성공했습니다.", HttpStatus.OK, sessions);
    }

    @GetMapping("/sessions/{sessionId}/messages")
    public ApiResponse<List<MessageDto>> getMessages(@AuthenticationPrincipal User user,
                                                     @PathVariable String sessionId) {
        List<MessageDto> messages = chatService.getSessionMessages(user, sessionId);
        return ApiResponse.success("채팅 내역 조회에 성공했습니다.", HttpStatus.OK, messages);
    }

    /**
     * 챗봇 초기화 API
     * 세션 ID 발급 및 초기 메인 버튼 목록 제공
     */
    @GetMapping("/init")
    public ResponseEntity<ApiResponse<?>> initChat(@AuthenticationPrincipal User user) {
        log.info("챗봇 초기화 요청: userId={}", user.getUserId());

        try {
            // 세션 ID 생성
            String sessionId = chatBotService.generateSessionId(user);

            // 메인 버튼 목록 조회
            List<ButtonDto> mainButtons = chatBotService.getMainButtons();

            // 응답 생성
            ChatBotResponse botResponse = ChatBotResponse.builder()
                    .sessionId(sessionId)
                    .message("안녕하세요! 배나나 AI 챗봇입니다. 원하시는 정보를 선택해주세요.")
                    .source("rule")
                    .buttons(mainButtons)
                    .createdAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build();

            return ResponseEntity.ok(ApiResponse.success("챗봇 초기화가 성공적으로 완료되었습니다.", HttpStatus.OK, botResponse));
        } catch (Exception e) {
            log.error("챗봇 초기화 중 오류 발생", e);
            return ResponseEntity.ok(ApiResponse.error("ERROR", HttpStatus.INTERNAL_SERVER_ERROR, "챗봇 초기화 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    /**
     * 챗봇 대화 API
     * 버튼 클릭 또는 텍스트 입력 처리
     */
    @PostMapping
    public ResponseEntity<ApiResponse<?>> chat(@RequestBody ChatMessageRequest request, @AuthenticationPrincipal User user) {
        // user null 체크: 인증 실패 시 401 반환
        if (user == null) {
            log.warn("인증되지 않은 사용자 요청: sessionId={}", request.getSessionId());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("UNAUTHORIZED", HttpStatus.UNAUTHORIZED, "인증 정보가 유효하지 않습니다."));
        }

        log.info("챗봇 대화 요청: userId={}, sessionId={}, message={}", user.getUserId(), request.getSessionId(), request.getMessage());

        try {
            // 요청 유효성 검사
            if (request.getMessage() == null || request.getMessage().isEmpty()) {
                log.warn("메시지 또는 버튼 ID가 비어 있음: userId={}", user.getUserId());
                return ResponseEntity.badRequest().body(
                        ApiResponse.error("INVALID_REQUEST", HttpStatus.BAD_REQUEST, "메시지 또는 버튼 ID가 비어 있습니다.")
                );
            }

            // 채팅 서비스를 통한 메시지 처리 및 저장
            ChatResponse response = chatService.sendMessage(user, request);
            return ResponseEntity.ok(ApiResponse.success("메시지가 처리되었습니다.", HttpStatus.OK, response));
        } catch (Exception e) {
            log.error("챗봇 처리 중 오류 발생", e);
            return ResponseEntity.ok(ApiResponse.error("ERROR", HttpStatus.INTERNAL_SERVER_ERROR, "챗봇 처리 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    /**
     * 세션 초기화 API
     */
    @PostMapping("/reset")
    public ResponseEntity<ApiResponse<?>> resetSession(@AuthenticationPrincipal User user) {
        log.info("세션 초기화 요청: userId={}", user.getUserId());
        try {
            chatBotService.resetSession(user);
            return ResponseEntity.ok(ApiResponse.success("세션이 초기화되었습니다.", HttpStatus.OK, null));
        } catch (Exception e) {
            log.error("세션 초기화 중 오류 발생", e);
            return ResponseEntity.ok(ApiResponse.error("ERROR", HttpStatus.INTERNAL_SERVER_ERROR, "세션 초기화 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }
}