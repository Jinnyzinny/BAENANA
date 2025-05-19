package com.ssafy.backend.chatbot.service;

import com.ssafy.backend.chatbot.dto.ButtonDto;
import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.user.entity.User;

import java.util.List;
import org.springframework.stereotype.Service;

/**
 * 챗봇 서비스 인터페이스
 * 버튼 클릭 및 텍스트 메시지 처리, 버튼 정보 제공
 */

@Service
public interface ChatBotService {
    /**
     * 버튼 클릭 처리
     *
     * @param user 사용자
     * @param buttonId 버튼 ID
     * @return 챗봇 응답
     */
    ChatBotResponse handleButtonClick(User user, String buttonId);

    /**
     * 텍스트 메시지 처리
     *
     * @param user 사용자
     * @param request 챗봇 요청
     * @return 챗봇 응답
     */
    ChatBotResponse handleTextMessage(User user, ChatRequest request);

    /**
     * 대화 세션 초기화
     *
     * @param user 사용자
     */
    void resetSession(User user);

    /**
     * 메인 버튼 목록 제공
     *
     * @return 메인 버튼 목록
     */
    List<ButtonDto> getMainButtons();

    /**
     * 서브 버튼 목록 제공
     *
     * @param mainButtonId 메인 버튼 ID
     * @return 서브 버튼 목록
     */
    List<ButtonDto> getSubButtons(String mainButtonId);

    /**
     * 세션 ID 생성
     *
     * @param user 사용자
     * @return 세션 ID
     */
    String generateSessionId(User user);

    /**
     * 버튼 정보 조회
     *
     * @param buttonId 버튼 ID
     * @return 버튼 정보
     */
    ButtonDto getButtonInfo(String buttonId);

    /**
     * AI 서비스 상태 확인
     *
     * @return 서비스 상태 (true: 정상, false: 비정상)
     */
    boolean checkAiServiceStatus();
}