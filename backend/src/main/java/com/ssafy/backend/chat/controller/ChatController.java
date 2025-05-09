package com.ssafy.backend.chat.controller;

import com.ssafy.backend.chat.dto.ChatMessageRequest;
import com.ssafy.backend.chat.dto.ChatResponse;
import com.ssafy.backend.chat.dto.ChatSessionDto;
import com.ssafy.backend.chat.dto.MessageDto;
import com.ssafy.backend.chat.service.ChatService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

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
}
