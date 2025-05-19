package com.ssafy.backend.chatbot.controller;

import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.chatbot.service.ChatBotService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 챗봇 관련 API 컨트롤러
 * 버튼 클릭 및 텍스트 입력 처리
 */
@Slf4j
@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatBotController {
    private final ChatBotService chatBotService;

    /**
     * 버튼 클릭 처리 엔드포인트
     *
     * @param user 인증된 사용자
     * @param buttonId 버튼 ID
     * @return 챗봇 응답
     */
    @PostMapping("/button/{buttonId}")
    public ResponseEntity<ApiResponse<?>> handleButtonClick(
            @AuthenticationPrincipal User user,
            @PathVariable String buttonId
    ) {
        log.info("버튼 클릭 요청: userId={}, buttonId={}", user.getUserId(), buttonId);
        ChatBotResponse response = chatBotService.handleButtonClick(user, buttonId);
        return ResponseEntity.ok(ApiResponse.success("챗봇 응답입니다.", response));
    }

    /**
     * 텍스트 메시지 처리 엔드포인트
     *
     * @param user 인증된 사용자
     * @param request 챗봇 요청 (텍스트 메시지 포함)
     * @return 챗봇 응답
     */
    @PostMapping("/message")
    public ResponseEntity<ApiResponse<?>> handleTextMessage(
            @AuthenticationPrincipal User user,
            @RequestBody ChatRequest request
    ) {
        log.info("텍스트 메시지 요청: userId={}, message={}", user.getUserId(), request.getContent());
        ChatBotResponse response = chatBotService.handleTextMessage(user, request);
        return ResponseEntity.ok(ApiResponse.success("챗봇 응답입니다.", response));
    }

    /**
     * 대화 세션 초기화 엔드포인트
     *
     * @param user 인증된 사용자
     * @return 성공 응답
     */
    @PostMapping("/session/reset")
    public ResponseEntity<ApiResponse<?>> resetSession(
            @AuthenticationPrincipal User user
    ) {
        log.info("대화 세션 초기화 요청: userId={}", user.getUserId());
        chatBotService.resetSession(user);
        return ResponseEntity.ok(ApiResponse.success("대화 세션이 초기화되었습니다."));
    }

    /**
     * 메인 버튼 목록 조회 엔드포인트
     *
     * @return 메인 버튼 목록
     */
    @GetMapping("/buttons/main")
    public ResponseEntity<ApiResponse<?>> getMainButtons() {
        log.info("메인 버튼 목록 요청");
        return ResponseEntity.ok(ApiResponse.success("메인 버튼 목록입니다.", chatBotService.getMainButtons()));
    }

    /**
     * 서브 버튼 목록 조회 엔드포인트
     *
     * @param mainButtonId 메인 버튼 ID
     * @return 서브 버튼 목록
     */
    @GetMapping("/buttons/sub/{mainButtonId}")
    public ResponseEntity<ApiResponse<?>> getSubButtons(
            @PathVariable String mainButtonId
    ) {
        log.info("서브 버튼 목록 요청: mainButtonId={}", mainButtonId);
        return ResponseEntity.ok(ApiResponse.success("서브 버튼 목록입니다.", chatBotService.getSubButtons(mainButtonId)));
    }
}