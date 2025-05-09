package com.ssafy.backend.chat.controller;

import com.ssafy.backend.chat.dto.ChatMessageRequest;
import com.ssafy.backend.chat.dto.ChatResponse;
import com.ssafy.backend.chat.service.ChatService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
