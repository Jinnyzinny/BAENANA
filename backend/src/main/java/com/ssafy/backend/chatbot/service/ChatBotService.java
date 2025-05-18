package com.ssafy.backend.chatbot.service;

import com.ssafy.backend.chatbot.client.RagServiceClient;
import com.ssafy.backend.chatbot.dto.ButtonDto;
import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.chat.entity.ChatMessages;
import com.ssafy.backend.chat.repository.ChatMessageRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatBotService {
    private final ChatMessageRepository chatMessageRepository;
    private final RagServiceClient ragServiceClient;

    // 메인 버튼 목록 (상수)
    private static final List<ButtonDto> MAIN_BUTTONS = Arrays.asList(
            new ButtonDto("hormone_analysis", "호르몬 패턴 분석"),
            new ButtonDto("period_prediction", "생리주기 예측"),
            new ButtonDto("test_guide", "테스트기 가이드"),
            new ButtonDto("pregnancy_guide", "임신 준비 가이드"),
            new ButtonDto("health_info", "건강 정보 검색"),
            new ButtonDto("service_guide", "서비스 사용 가이드")
    );

    // 하위 버튼 목록 (상수)
    private static final Map<String, List<ButtonDto>> SUB_BUTTONS = new HashMap<>();

    static {
        // 호르몬 패턴 분석 하위 버튼
        SUB_BUTTONS.put("hormone_analysis", Arrays.asList(
                new ButtonDto("pattern_analysis", "패턴 분석 결과 보기"),
                new ButtonDto("pattern_management", "패턴별 관리법"),
                new ButtonDto("hormone_balance", "호르몬 균형 관리"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));

        // 생리주기 예측 하위 버튼
        SUB_BUTTONS.put("period_prediction", Arrays.asList(
                new ButtonDto("next_period", "다음 월경일 예측"),
                new ButtonDto("ovulation_prediction", "배란일 예측"),
                new ButtonDto("cycle_irregularity", "주기 불규칙성 분석"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));

        // 테스트기 가이드 하위 버튼
        SUB_BUTTONS.put("test_guide", Arrays.asList(
                new ButtonDto("ovulation_test_usage", "배란 테스트기 사용법"),
                new ButtonDto("ovulation_test_caution", "배란 테스트기 주의사항"),
                new ButtonDto("pregnancy_test_usage", "임신 테스트기 사용법"),
                new ButtonDto("pregnancy_test_caution", "임신 테스트기 주의사항"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));

        // 임신 준비 가이드 하위 버튼
        SUB_BUTTONS.put("pregnancy_guide", Arrays.asList(
                new ButtonDto("pregnancy_possibility", "임신 가능성 확인"),
                new ButtonDto("pregnancy_health_tips", "임신 준비 건강 관리"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));

        // 건강 정보 검색 하위 버튼
        SUB_BUTTONS.put("health_info", Arrays.asList(
                new ButtonDto("anxiety_tips", "불안 완화 팁"),
                new ButtonDto("fatigue_management", "피로 관리 팁"),
                new ButtonDto("ovulation_period_qa", "배란·생리 Q&A"),
                new ButtonDto("nutrition_tips", "여성 영양 관리 팁"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));

        // 서비스 사용 가이드 하위 버튼
        SUB_BUTTONS.put("service_guide", Arrays.asList(
                new ButtonDto("app_faq", "앱 사용법 FAQ"),
                new ButtonDto("back_to_main", "← 처음으로")
        ));
    }

    // 버튼 별 규칙 기반 여부 (true: 규칙 기반, false: RAG 필요)
    private static final Map<String, Boolean> BUTTON_RULE_MAP = new HashMap<>();

    static {
        // 메인 버튼들은 규칙 기반
        MAIN_BUTTONS.forEach(btn -> BUTTON_RULE_MAP.put(btn.getId(), true));

        // "back_to_main"은 규칙 기반
        BUTTON_RULE_MAP.put("back_to_main", true);

        // 호르몬 패턴 분석 하위 버튼
        BUTTON_RULE_MAP.put("pattern_analysis", true);    // Rule 처리 (사용자 데이터 기반)
        BUTTON_RULE_MAP.put("pattern_management", false); // RAG 호출 (일반적인 관리법 정보)
        BUTTON_RULE_MAP.put("hormone_balance", false);    // RAG 호출 (건강 정보 제공)

        // 생리주기 예측 하위 버튼 - 모두 Rule 처리
        BUTTON_RULE_MAP.put("next_period", true);         // Rule 처리 (생리주기 정보 기반 계산)
        BUTTON_RULE_MAP.put("ovulation_prediction", true); // Rule 처리 (생리주기+LH 테스트 결과 기반)
        BUTTON_RULE_MAP.put("cycle_irregularity", true);  // Rule 처리 (생리주기 데이터 패턴 분석)

        // 테스트기 가이드 하위 버튼 - 모두 Rule 처리
        BUTTON_RULE_MAP.put("ovulation_test_usage", true);    // Rule 처리 (고정된 사용 방법 정보)
        BUTTON_RULE_MAP.put("ovulation_test_caution", true);  // Rule 처리 (고정된 주의사항 정보)
        BUTTON_RULE_MAP.put("pregnancy_test_usage", true);    // Rule 처리 (고정된 사용 방법 정보)
        BUTTON_RULE_MAP.put("pregnancy_test_caution", true);  // Rule 처리 (고정된 주의사항 정보)

        // 임신 준비 가이드 하위 버튼
        BUTTON_RULE_MAP.put("pregnancy_possibility", true);   // Rule 처리 (주기+테스트 기록 기반)
        BUTTON_RULE_MAP.put("pregnancy_health_tips", false);  // RAG 호출 (건강 관리 정보 제공)

        // 건강 정보 검색 하위 버튼 - 모두 RAG 호출
        BUTTON_RULE_MAP.put("anxiety_tips", false);          // RAG 호출 (정신 건강 정보)
        BUTTON_RULE_MAP.put("fatigue_management", false);    // RAG 호출 (건강 관리 정보)
        BUTTON_RULE_MAP.put("ovulation_period_qa", false);   // RAG 호출 (건강 정보 제공)
        BUTTON_RULE_MAP.put("nutrition_tips", false);        // RAG 호출 (영양 정보 제공)

        // 서비스 사용 가이드 하위 버튼
        BUTTON_RULE_MAP.put("app_faq", true);                // Rule 처리 (고정된 FAQ 정보)
    }

    // 버튼 ID로 버튼 텍스트 찾기
    private String getButtonText(String buttonId) {
        // 메인 버튼 확인
        Optional<ButtonDto> mainButton = MAIN_BUTTONS.stream()
                .filter(btn -> btn.getId().equals(buttonId))
                .findFirst();

        if (mainButton.isPresent()) {
            return mainButton.get().getText();
        }

        // 하위 버튼 확인
        for (List<ButtonDto> buttons : SUB_BUTTONS.values()) {
            Optional<ButtonDto> subButton = buttons.stream()
                    .filter(btn -> btn.getId().equals(buttonId))
                    .findFirst();

            if (subButton.isPresent()) {
                return subButton.get().getText();
            }
        }

        return buttonId; // 버튼을 찾지 못한 경우
    }

    // 버튼이 규칙 기반인지 확인
    public boolean isRuleBasedButton(String buttonId) {
        return BUTTON_RULE_MAP.getOrDefault(buttonId, false);
    }

    @Transactional
    public ChatBotResponse processRequest(User user, ChatRequest request) {
        // 세션 ID 확인 (없으면 새로 생성)
        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.isBlank()) {
            sessionId = UUID.randomUUID().toString();
        }

        // 사용자 정보 및 응답 변수
        LocalDateTime now = LocalDateTime.now();
        ChatBotResponse response;
        String userDisplayMessage = "";

        // 입력 유형에 따른 분기 처리
        switch (request.getInputType()) {
            case "init":
                // 초기화 요청 (메인 버튼 목록 반환)
                response = handleInitRequest(sessionId);
                break;

            case "button":
                // 버튼 클릭 요청
                String buttonId = request.getContent();
                String buttonText = getButtonText(buttonId);
                userDisplayMessage = "💫 " + buttonText;

                if (isRuleBasedButton(buttonId)) {
                    // 규칙 기반 버튼은 Java에서 처리
                    response = handleButtonRequest(sessionId, buttonId);
                } else {
                    // RAG 필요한 버튼은 Python 서비스로 위임
                    // 사용자 객체도 함께 전달하도록 수정
                    response = ragServiceClient.callRagService(user, request);
                }
                break;

            case "text":
                // 텍스트 입력 요청 (항상 Python RAG 서비스로 위임)
                userDisplayMessage = request.getContent();
                // 사용자 객체도 함께 전달하도록 수정
                response = ragServiceClient.callRagService(user, request);
                break;

            default:
                throw new IllegalArgumentException("지원하지 않는 입력 유형: " + request.getInputType());
        }

        // 사용자 메시지 저장 (텍스트 또는 버튼 클릭)
        if (!"init".equals(request.getInputType())) {
            saveMessage(user, sessionId, "user", userDisplayMessage, now);
        }

        // 챗봇 응답 저장
        saveMessage(user, sessionId, "bot", response.getMessage(), now.plusSeconds(1));

        // userMessage 설정 (요청이 "init"이 아닌 경우)
        if (!"init".equals(request.getInputType())) {
            response.setUserMessage(userDisplayMessage);
        }

        // 세션 ID 및 응답 시간 설정
        response.setSessionId(sessionId);

        return response;
    }

    // 메시지 저장 헬퍼 메서드
    private ChatMessages saveMessage(User user, String sessionId, String sender,
                                     String message, LocalDateTime time) {
        ChatMessages chat = new ChatMessages();
        chat.setUser(user);
        chat.setSessionId(sessionId);
        chat.setSender(sender);
        chat.setMessage(message);
        chat.setCreatedAt(time);
        return chatMessageRepository.save(chat);
    }

    // 초기화 요청 처리
    public ChatBotResponse handleInitRequest(String sessionId) {
        return ChatBotResponse.create(
                sessionId,
                "안녕하세요! 배나나 AI 챗봇입니다. 원하시는 정보를 선택해주세요.",
                "rule",
                MAIN_BUTTONS,
                null
        );
    }

    // 규칙 기반 버튼 요청 처리
    private ChatBotResponse handleButtonRequest(String sessionId, String buttonId) {
        if ("back_to_main".equals(buttonId)) {
            return ChatBotResponse.create(
                    sessionId,
                    "메인 메뉴로 돌아왔습니다. 원하시는 정보를 선택해주세요.",
                    "rule",
                    MAIN_BUTTONS,
                    "← 처음으로"
            );
        }

        // 메인 버튼인 경우 (하위 버튼 목록 반환)
        if (MAIN_BUTTONS.stream().anyMatch(btn -> btn.getId().equals(buttonId))) {
            String buttonText = getButtonText(buttonId);
            List<ButtonDto> subButtons = SUB_BUTTONS.getOrDefault(buttonId, Collections.emptyList());

            return ChatBotResponse.create(
                    sessionId,
                    buttonText + "을 위해 원하시는 항목을 선택해주세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "pattern_analysis" 버튼은 특별 처리 (사용자 데이터 기반)
        if ("pattern_analysis".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("hormone_analysis");

            return ChatBotResponse.create(
                    sessionId,
                    "호르몬 패턴 분석 결과를 확인하려면 먼저 데이터가 필요합니다. 앱에서 데이터를 입력해주셨나요?",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "next_period" 버튼 처리 (생리주기 정보 기반 계산)
        if ("next_period".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("period_prediction");

            return ChatBotResponse.create(
                    sessionId,
                    "내 최근 주기 데이터를 기반으로 이번 달 월경 예정일을 계산합니다. 잠시만 기다려주세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "ovulation_prediction" 버튼 처리 (생리주기+LH 테스트 결과 기반)
        if ("ovulation_prediction".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("period_prediction");

            return ChatBotResponse.create(
                    sessionId,
                    "생리주기와 LH 테스트 결과를 바탕으로 다음 배란일을 예측합니다. 잠시만 기다려주세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "cycle_irregularity" 버튼 처리 (생리주기 데이터 패턴 분석)
        if ("cycle_irregularity".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("period_prediction");

            return ChatBotResponse.create(
                    sessionId,
                    "최근 6개월 간의 생리주기 데이터를 분석하여 불규칙성을 확인합니다. 잠시만 기다려주세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "ovulation_test_usage" 버튼 처리 (고정된 사용 방법 정보)
        if ("ovulation_test_usage".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("test_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "배란 테스트기 사용법은 다음과 같습니다:\n\n" +
                            "1. 소변을 깨끗한 용기에 수집합니다.\n" +
                            "2. 테스트 스틱을 소변에 5-10초간 담급니다.\n" +
                            "3. 평평한 곳에 올려두고 5분간 기다립니다.\n" +
                            "4. 결과 창에 나타난 선의 진하기를 확인합니다.\n" +
                            "5. 테스트 선이 대조선보다 같거나 진하면 양성입니다.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "ovulation_test_caution" 버튼 처리 (고정된 주의사항 정보)
        if ("ovulation_test_caution".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("test_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "배란 테스트기 사용 시 주의사항:\n\n" +
                            "1. 매일 같은 시간에 테스트하세요 (오전 10시~오후 8시 사이 권장).\n" +
                            "2. 테스트 전 2시간 동안은 소변을 참고, 과도한 수분 섭취를 피하세요.\n" +
                            "3. 약물 복용 중이면 테스트 결과가 부정확할 수 있습니다.\n" +
                            "4. 테스트 선이 희미해도 점점 진해지면 곧 배란이 시작된다는 신호입니다.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "pregnancy_test_usage" 버튼 처리 (고정된 사용 방법 정보)
        if ("pregnancy_test_usage".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("test_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "임신 테스트기 사용법은 다음과 같습니다:\n\n" +
                            "1. 아침 첫 소변을 사용하는 것이 가장 정확합니다.\n" +
                            "2. 테스트 스틱의 흡수부를 3-5초간 소변에 담그거나 소변을 흡수부에 직접 묻힙니다.\n" +
                            "3. 테스트 스틱을 평평한 곳에 올려두고 지시된 시간(보통 3-5분)동안 기다립니다.\n" +
                            "4. 결과 창에 나타나는 선이나 표시를 확인합니다.\n" +
                            "5. 대조선과 테스트 선 모두 나타나면 양성(임신)입니다.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "pregnancy_test_caution" 버튼 처리 (고정된 주의사항 정보)
        if ("pregnancy_test_caution".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("test_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "임신 테스트기 사용 시 주의사항:\n\n" +
                            "1. 생리 예정일 이후에 테스트하면 더 정확합니다.\n" +
                            "2. 결과 해석 시간을 초과하면 잘못된 결과가 나올 수 있습니다.\n" +
                            "3. 특정 약물(예: hCG 함유 임신 촉진제)은 위양성 결과를 줄 수 있습니다.\n" +
                            "4. 테스트 선이 매우 희미하게 나타나도 양성일 수 있으니 재검사하세요.\n" +
                            "5. 확진을 위해서는 반드시 의사와 상담하세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "pregnancy_possibility" 버튼 처리 (주기+테스트 기록 기반)
        if ("pregnancy_possibility".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("pregnancy_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "최근 생리주기와 배란 테스트 기록을 기반으로 임신 가능성을 분석합니다. 잠시만 기다려주세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // "app_faq" 버튼 처리 (고정된 FAQ 정보)
        if ("app_faq".equals(buttonId)) {
            List<ButtonDto> subButtons = SUB_BUTTONS.get("service_guide");

            return ChatBotResponse.create(
                    sessionId,
                    "자주 묻는 질문:\n\n" +
                            "Q: 앱에 입력한 데이터는 안전한가요?\n" +
                            "A: 네, 모든 데이터는 암호화되어 저장되며 사용자 동의 없이 공유되지 않습니다.\n\n" +
                            "Q: 생리 알림을 설정하려면 어떻게 하나요?\n" +
                            "A: 홈 화면에서 '설정' 메뉴로 이동 후 '알림' 섹션에서 설정할 수 있습니다.\n\n" +
                            "Q: 호르몬 테스트 결과를 앱에 추가하려면 어떻게 하나요?\n" +
                            "A: 달력 화면에서 날짜를 선택한 후 '테스트 결과 추가' 버튼을 클릭하세요.",
                    "rule",
                    subButtons,
                    null
            );
        }

        // 기본 응답 (여기까지 오면 안 됨)
        return ChatBotResponse.create(
                sessionId,
                "지원하지 않는 버튼입니다.",
                "rule",
                MAIN_BUTTONS,
                null
        );
    }
}