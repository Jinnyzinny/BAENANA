package com.ssafy.backend.chatbot.client;

import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

/**
 * Python FastAPI 기반 RAG 서비스와 통신하는 클라이언트
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RagServiceClient {

    private final RestTemplate restTemplate;

    @Value("${rag.service.url}")
    private String ragServiceUrl;

    @Value("${rag.service.health-check-url}")
    private String healthCheckUrl;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * RAG 서비스에 요청을 전송하고 응답을 받음
     *
     * @param request 챗봇 요청 객체
     * @return 챗봇 응답 객체
     */
    public ChatBotResponse sendRagRequest(ChatRequest request) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);

            log.info("RAG 서비스 요청: {}", request);
            ResponseEntity<ChatBotResponse> response = restTemplate.postForEntity(ragServiceUrl, entity, ChatBotResponse.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                log.info("RAG 서비스 응답 성공: {}", response.getBody());
                return response.getBody();
            } else {
                log.error("RAG 서비스 응답 실패: 상태 코드={}", response.getStatusCode().value());
                return createFallbackResponse(request);
            }
        } catch (Exception e) {
            log.error("RAG 서비스 요청 중 오류 발생", e);
            return createFallbackResponse(request);
        }
    }

    /**
     * 서버 상태 확인 (health check)
     *
     * @return 서버 상태 (true: 정상, false: 비정상)
     */
    public boolean checkServerHealth() {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(healthCheckUrl, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.error("RAG 서비스 상태 확인 중 오류 발생", e);
            return false;
        }
    }

    /**
     * 폴백 응답 생성
     */
    private ChatBotResponse createFallbackResponse(ChatRequest request) {
        return ChatBotResponse.builder()
                .sessionId(request.getSessionId())
                .message("죄송합니다. 현재 AI 서비스에 접속할 수 없습니다. 잠시 후 다시 시도해주세요.")
                .source("rule")
                .buttons(Collections.emptyList())
                .userMessage(request.getContent())
                .createdAt(LocalDateTime.now().format(DATE_FORMATTER))
                .build();
    }
}