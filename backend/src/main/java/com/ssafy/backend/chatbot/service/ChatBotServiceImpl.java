package com.ssafy.backend.chatbot.service;

import com.ssafy.backend.calendar.service.CalendarService;
import com.ssafy.backend.chatbot.client.RagServiceClient;
import com.ssafy.backend.chatbot.dto.ButtonDto;
import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.home.service.HomeService;
import com.ssafy.backend.medication.service.report.MedicationReportService;
import com.ssafy.backend.menstrual.service.report.MenstrualService;
import com.ssafy.backend.report.service.ReportService;
import com.ssafy.backend.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 챗봇 서비스 구현체
 */
@Slf4j
@Service
public class ChatBotServiceImpl implements ChatBotService {
    // 서비스 의존성
    private final RagServiceClient ragServiceClient;
    private final ReportService reportService;
    private final MenstrualService menstrualService;
    private final CalendarService calendarService;
    private final HomeService homeService;
    private final MedicationReportService medicationReportService;

    // 버튼 정보
    private final List<ButtonDto> mainButtons;
    private final Map<String, List<ButtonDto>> subButtons;

    /**
     * 생성자 주입
     * - 순환 참조를 방지하기 위해 필요한 경우 @Lazy 사용
     */
    public ChatBotServiceImpl(
            RagServiceClient ragServiceClient,
            @Lazy ReportService reportService,
            @Lazy MenstrualService menstrualService,
            @Lazy CalendarService calendarService,
            @Lazy HomeService homeService,
            @Lazy MedicationReportService medicationReportService,
            List<ButtonDto> mainButtons,
            @Qualifier("subButtons") Map<String, List<ButtonDto>> subButtons) {
        this.ragServiceClient = ragServiceClient;
        this.reportService = reportService;
        this.menstrualService = menstrualService;
        this.calendarService = calendarService;
        this.homeService = homeService;
        this.medicationReportService = medicationReportService;
        this.mainButtons = mainButtons;
        this.subButtons = subButtons;
    }

    // 날짜 포맷터
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public ChatBotResponse handleButtonClick(User user, String buttonId) {
        try {
            log.info("버튼 클릭 처리: userId={}, buttonId={}", user.getUserId(), buttonId);

            // 버튼 정보 조회
            ButtonDto buttonInfo = getButtonInfo(buttonId);
            if (buttonInfo == null) {
                log.error("알 수 없는 버튼 ID: {}", buttonId);
                return createErrorResponse("알 수 없는 버튼 ID입니다.");
            }

            // 'back_to_main' 버튼 처리
            if ("back_to_main".equals(buttonId)) {
                return createMainMenuResponse(user);
            }

            // 메인 버튼(Navigation 유형) 처리 - 서브 버튼 목록 반환
            if ("Navigation".equals(buttonInfo.getType()) && subButtons.containsKey(buttonId)) {
                return createSubMenuResponse(user, buttonId, buttonInfo.getText());
            }

            // 사용자 데이터 수집
            Map<String, Object> userData = collectUserData(user, buttonInfo);

            // AI 서비스에 요청 전송
            ChatRequest request = createChatRequest(user, buttonId, userData);

            // AI 서비스 응답 처리
            return ragServiceClient.sendRagRequest(request);

        } catch (Exception e) {
            log.error("버튼 클릭 처리 중 오류 발생", e);
            return createErrorResponse("요청 처리 중 오류가 발생했습니다.");
        }
    }

    @Override
    public ChatBotResponse handleTextMessage(User user, ChatRequest request) {
        try {
            log.info("텍스트 메시지 처리: userId={}, message={}", user.getUserId(), request.getContent());

            // 세션 ID 설정
            if (request.getSessionId() == null || request.getSessionId().isEmpty()) {
                request.setSessionId(generateSessionId(user));
            }

            // 입력 유형 설정
            request.setInputType("text");

            // 사용자 데이터 수집 (텍스트 요청에는 기본 데이터만 포함)
            Map<String, Object> userData = collectBasicUserData(user);
            request.setUserData(userData);

            // AI 서비스에 요청 전송
            return ragServiceClient.sendRagRequest(request);

        } catch (Exception e) {
            log.error("텍스트 메시지 처리 중 오류 발생", e);
            return createErrorResponse("요청 처리 중 오류가 발생했습니다.");
        }
    }

    @Override
    public void resetSession(User user) {
        log.info("대화 세션 초기화: userId={}", user.getUserId());
        // AI 서비스에 세션 초기화 요청을 보낼 수 있음
        // 현재는 별도 구현 없음
    }

    @Override
    public List<ButtonDto> getMainButtons() {
        return mainButtons;
    }

    @Override
    public List<ButtonDto> getSubButtons(String mainButtonId) {
        return subButtons.getOrDefault(mainButtonId, List.of());
    }

    @Override
    public String generateSessionId(User user) {
        return user.getUserId() + "_" + UUID.randomUUID().toString();
    }

    @Override
    public ButtonDto getButtonInfo(String buttonId) {
        // 메인 버튼에서 검색
        for (ButtonDto button : mainButtons) {
            if (button.getId().equals(buttonId)) {
                return button;
            }
        }

        // 서브 버튼에서 검색
        for (List<ButtonDto> buttons : subButtons.values()) {
            for (ButtonDto button : buttons) {
                if (button.getId().equals(buttonId)) {
                    return button;
                }
            }
        }

        return null;
    }

    @Override
    public boolean checkAiServiceStatus() {
        return ragServiceClient.checkServerHealth();
    }

    /**
     * 사용자 데이터 수집
     *
     * @param user 사용자
     * @param buttonInfo 버튼 정보
     * @return 수집된 사용자 데이터
     */
    private Map<String, Object> collectUserData(User user, ButtonDto buttonInfo) {
        Map<String, Object> userData = new HashMap<>();

        // 기본 사용자 정보 수집
        userData.putAll(collectBasicUserData(user));

        // 버튼 ID에 따라 필요한 데이터 수집
        switch (buttonInfo.getId()) {
            // 호르몬 패턴 분석 관련 버튼
            case "pattern_analysis":
            case "pattern_management":
            case "hormone_balance":
                collectHormoneData(userData, user);
                break;

            // 생리주기 예측 관련 버튼
            case "next_period":
            case "ovulation_prediction":
            case "cycle_irregularity":
                collectMenstrualData(userData, user);
                break;

            // 임신 준비 가이드 관련 버튼
            case "pregnancy_possibility":
            case "pregnancy_health_tips":
                collectPregnancyData(userData, user);
                break;

            // 기타 건강 정보 관련 버튼
            case "anxiety_tips":
            case "fatigue_management":
            case "ovulation_period_qa":
            case "nutrition_tips":
                collectHealthData(userData, user);
                break;

            // 테스트기 관련 버튼
            case "ovulation_test_usage":
            case "ovulation_test_caution":
            case "pregnancy_test_usage":
            case "pregnancy_test_caution":
                collectTestData(userData, user);
                break;
        }

        return userData;
    }

    /**
     * 기본 사용자 데이터 수집
     */
    private Map<String, Object> collectBasicUserData(User user) {
        Map<String, Object> userData = new HashMap<>();

        // 사용자 기본 정보
        userData.put("userId", user.getUserId());

        return userData;
    }

    /**
     * 호르몬 관련 데이터 수집
     */
    private void collectHormoneData(Map<String, Object> userData, User user) {
        try {
            // 보고서 데이터 수집
            ApiResponse<?> summaryResponse = reportService.getSummary(user);
            if (summaryResponse.getData() != null) {
                userData.put("summary", summaryResponse.getData());
            }

            // 생리 주기 정보 수집
            ApiResponse<?> menstrualInfoResponse = menstrualService.getMenstrualInfo(user);
            if (menstrualInfoResponse.getData() != null) {
                userData.put("menstrualInfo", menstrualInfoResponse.getData());
            }

            // 배란 테스트 결과 수집
            ApiResponse<?> ovulationTestResponse = menstrualService.getOvulationTest(user);
            if (ovulationTestResponse.getData() != null) {
                userData.put("ovulationTest", ovulationTestResponse.getData());
            }
        } catch (Exception e) {
            log.error("호르몬 데이터 수집 중 오류 발생", e);
        }
    }

    /**
     * 생리 관련 데이터 수집
     */
    private void collectMenstrualData(Map<String, Object> userData, User user) {
        try {
            // 생리 주기 정보 수집
            ApiResponse<?> menstrualInfoResponse = menstrualService.getMenstrualInfo(user);
            if (menstrualInfoResponse.getData() != null) {
                userData.put("menstrualInfo", menstrualInfoResponse.getData());
            }

            // 최근 생리 주기 수집
            ApiResponse<?> recentMenstrualResponse = menstrualService.getRecentMenstrual(user);
            if (recentMenstrualResponse.getData() != null) {
                userData.put("recentMenstrual", recentMenstrualResponse.getData());
            }

            // 생리 예측 정보 수집
            ApiResponse<?> predictionResponse = calendarService.getMenstrualPrediction(user);
            if (predictionResponse.getData() != null) {
                userData.put("menstrualPrediction", predictionResponse.getData());
            }
        } catch (Exception e) {
            log.error("생리 데이터 수집 중 오류 발생", e);
        }
    }

    /**
     * 임신 관련 데이터 수집
     */
    private void collectPregnancyData(Map<String, Object> userData, User user) {
        try {
            // 가임기 정보 수집
            ApiResponse<?> bearingPeriodResponse = calendarService.getBearingPeriod(user);
            if (bearingPeriodResponse.getData() != null) {
                userData.put("bearingPeriod", bearingPeriodResponse.getData());
            }

            // 배란 테스트 결과 수집
            ApiResponse<?> ovulationTestResponse = menstrualService.getOvulationTest(user);
            if (ovulationTestResponse.getData() != null) {
                userData.put("ovulationTest", ovulationTestResponse.getData());
            }

            // 남은 일수 정보 수집
            ApiResponse<?> remainDayResponse = homeService.getRemainDay(user);
            if (remainDayResponse.getData() != null) {
                userData.put("remainDay", remainDayResponse.getData());
            }
        } catch (Exception e) {
            log.error("임신 데이터 수집 중 오류 발생", e);
        }
    }

    /**
     * 건강 관련 데이터 수집
     */
    private void collectHealthData(Map<String, Object> userData, User user) {
        try {
            // 약물 정보 수집
            ApiResponse<?> medicationResponse = medicationReportService.getRecentMedication(user);
            if (medicationResponse.getData() != null) {
                userData.put("medication", medicationResponse.getData());
            }

            // 보고서 데이터 수집
            ApiResponse<?> summaryResponse = reportService.getSummary(user);
            if (summaryResponse.getData() != null) {
                userData.put("summary", summaryResponse.getData());
            }

            // 병원 예약 정보 수집
            ApiResponse<?> reservationResponse = homeService.getHospitalReservation(user);
            if (reservationResponse.getData() != null) {
                userData.put("hospitalReservation", reservationResponse.getData());
            }
        } catch (Exception e) {
            log.error("건강 데이터 수집 중 오류 발생", e);
        }
    }

    /**
     * 테스트기 관련 데이터 수집
     */
    private void collectTestData(Map<String, Object> userData, User user) {
        try {
            // 배란 테스트 결과 수집
            ApiResponse<?> ovulationTestResponse = menstrualService.getOvulationTest(user);
            if (ovulationTestResponse.getData() != null) {
                userData.put("ovulationTest", ovulationTestResponse.getData());
            }
        } catch (Exception e) {
            log.error("테스트 데이터 수집 중 오류 발생", e);
        }
    }

    /**
     * AI 서비스 요청 생성
     */
    private ChatRequest createChatRequest(User user, String buttonId, Map<String, Object> userData) {
        return ChatRequest.builder()
                .inputType("button")
                .content(buttonId)
                .sessionId(generateSessionId(user))
                .userData(userData)
                .build();
    }

    /**
     * 메인 메뉴 응답 생성
     */
    private ChatBotResponse createMainMenuResponse(User user) {
        return ChatBotResponse.builder()
                .sessionId(generateSessionId(user))
                .message("메인 메뉴입니다. 원하시는 항목을 선택해주세요.")
                .source("rule")
                .buttons(mainButtons)
                .userMessage("처음으로 돌아가기")
                .createdAt(LocalDateTime.now().format(DATE_FORMATTER))
                .build();
    }

    /**
     * 서브 메뉴 응답 생성
     */
    private ChatBotResponse createSubMenuResponse(User user, String mainButtonId, String buttonText) {
        List<ButtonDto> buttons = subButtons.get(mainButtonId);

        return ChatBotResponse.builder()
                .sessionId(generateSessionId(user))
                .message(buttonText + "을 위해 원하시는 항목을 선택해주세요.")
                .source("rule")
                .buttons(buttons)
                .userMessage("💫 " + buttonText)
                .createdAt(LocalDateTime.now().format(DATE_FORMATTER))
                .build();
    }

    /**
     * 오류 응답 생성
     */
    private ChatBotResponse createErrorResponse(String errorMessage) {
        return ChatBotResponse.builder()
                .sessionId("error")
                .message(errorMessage)
                .source("rule")
                .buttons(mainButtons)
                .userMessage("")
                .createdAt(LocalDateTime.now().format(DATE_FORMATTER))
                .build();
    }
}