package com.ssafy.backend.chatbot.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
import java.util.*;

/**
 * Python FastAPI 기반 RAG 서비스와 통신하는 클라이언트
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RagServiceClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${rag.service.url}")
    private String ragServiceUrl;

    @Value("${rag.service.health-check-url}")
    private String healthCheckUrl;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 버튼 ID와 매핑 질문 정의
    private static final Map<String, String> BUTTON_QUESTION_MAP = new HashMap<>();

    static {
        // 호르몬 패턴 분석 관련 버튼
        BUTTON_QUESTION_MAP.put("pattern_analysis", "최근 내 기록을 기반으로 호르몬 패턴을 분석해주세요.");
        BUTTON_QUESTION_MAP.put("pattern_management", "제 호르몬 패턴에 맞는 건강 관리법을 알려주세요.");
        BUTTON_QUESTION_MAP.put("hormone_balance", "호르몬 균형을 유지하기 위한 생활 습관을 알려주세요.");

        // 생리주기 예측 관련 버튼
        BUTTON_QUESTION_MAP.put("next_period", "내 최근 주기 데이터를 기반으로 이번 달 월경 예정일을 알려주세요.");
        BUTTON_QUESTION_MAP.put("ovulation_prediction", "내 데이터를 바탕으로 다음 배란일을 예측해주세요.");
        BUTTON_QUESTION_MAP.put("cycle_irregularity", "내 생리주기의 불규칙성에 대해 분석해주세요.");

        // 테스트기 가이드 관련 버튼
        BUTTON_QUESTION_MAP.put("ovulation_test_usage", "배란 테스트기를 올바르게 사용하는 방법을 단계별로 알려주세요.");
        BUTTON_QUESTION_MAP.put("ovulation_test_caution", "배란 테스트기 사용 시 주의할 점이나 결과 해석 방법을 알려주세요.");
        BUTTON_QUESTION_MAP.put("pregnancy_test_usage", "임신 테스트기를 올바르게 사용하는 방법을 단계별로 알려주세요.");
        BUTTON_QUESTION_MAP.put("pregnancy_test_caution", "임신 테스트기 사용 시 주의할 점이나 결과 해석 방법을 알려주세요.");

        // 임신 준비 가이드 관련 버튼
        BUTTON_QUESTION_MAP.put("pregnancy_possibility", "최근 기록을 기준으로 임신 가능성이 얼마나 되는지 알려주세요.");
        BUTTON_QUESTION_MAP.put("pregnancy_health_tips", "임신을 준비 중일 때 챙겨야 할 건강 관리 팁을 알려주세요.");

        // 건강 정보 검색 관련 버튼
        BUTTON_QUESTION_MAP.put("anxiety_tips", "불안할 때 도움이 될 만한 팁이나 생활 습관을 알려주세요.");
        BUTTON_QUESTION_MAP.put("fatigue_management", "피로할 때 건강 관리를 위해 할 수 있는 방법을 알려주세요.");
        BUTTON_QUESTION_MAP.put("ovulation_period_qa", "배란과 생리에 대해 자주 묻는 질문들을 요약해주세요.");
        BUTTON_QUESTION_MAP.put("nutrition_tips", "여성 건강을 위한 필수 영양소와 식습관에 대해 알려주세요.");

        // 서비스 사용 가이드 관련 버튼
        BUTTON_QUESTION_MAP.put("app_faq", "앱 사용법에 대한 자주 묻는 질문을 알려주세요.");
    }

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

            // 원본 요청 내용에서 FastAPI용 프롬프트 생성
            Map<String, Object> promptData = createPromptForAI(request);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(promptData, headers);

            log.info("RAG 서비스 요청: {}", promptData);
            ResponseEntity<ChatBotResponse> response = restTemplate.postForEntity(ragServiceUrl, entity, ChatBotResponse.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                log.info("RAG 서비스 응답 성공: {}", response.getBody());

                // 세션 ID 유지
                ChatBotResponse responseBody = response.getBody();
                if (request.getSessionId() != null && !request.getSessionId().isEmpty()) {
                    responseBody.setSessionId(request.getSessionId());
                }

                return responseBody;
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
     * 챗봇 요청을 AI 모델이 이해할 수 있는 프롬프트로 변환
     *
     * @param request 챗봇 요청 객체
     * @return AI 모델용 프롬프트 객체
     */
    private Map<String, Object> createPromptForAI(ChatRequest request) {
        Map<String, Object> promptData = new HashMap<>();

        // 1. 사용자 질문 설정 (버튼 ID면 매핑 질문으로 변환, 텍스트면 그대로 사용)
        String question;
        if ("button".equals(request.getInputType())) {
            question = BUTTON_QUESTION_MAP.getOrDefault(request.getContent(), request.getContent());
        } else {
            question = request.getContent();
        }
        promptData.put("question", question);

        // 2. 사용자 ID 설정
        if (request.getUserData() != null && request.getUserData().containsKey("userId")) {
            promptData.put("user_id", request.getUserData().get("userId").toString());
        } else {
            promptData.put("user_id", "unknown");
        }

        // 3. 사용자 정보 변환 및 설정 - JSON 문자열로 변환
        if (request.getUserData() != null && !request.getUserData().isEmpty()) {
            try {
                // 테스트기 가이드 관련 버튼인 경우 데이터를 전송하지 않음
                if (isTestGuideButton(request.getContent())) {
                    promptData.put("user_info", "{}");
                } else {
                // 수정 후 코드
                // 사용자 데이터를 한국어로 변환
                    ObjectNode userInfoNode = createUserInfoNode(request.getUserData(), request.getContent());

                // ObjectNode를 직접 전달 (문자열 변환 없이)
                    promptData.put("user_info", userInfoNode);
                }
            } catch (Exception e) {
                log.error("사용자 정보 변환 중 오류 발생", e);
                promptData.put("user_info", "{}");
            }
        } else {
            promptData.put("user_info", "{}");
        }

        return promptData;
    }

    /**
     * 테스트기 가이드 관련 버튼인지 확인
     */
    private boolean isTestGuideButton(String buttonId) {
        return buttonId != null && (
                buttonId.equals("ovulation_test_usage") ||
                        buttonId.equals("ovulation_test_caution") ||
                        buttonId.equals("pregnancy_test_usage") ||
                        buttonId.equals("pregnancy_test_caution"));
    }

    /**
     * 사용자 데이터를 한국어 기반 사용자 정보 노드로 변환
     *
     * @param userData 원본 사용자 데이터
     * @param buttonId 버튼 ID (테스트기 가이드 관련 버튼인지 확인용)
     * @return 한국어 변환된 사용자 정보 노드
     */
    private ObjectNode createUserInfoNode(Map<String, Object> userData, String buttonId) {
        ObjectNode userInfoNode = objectMapper.createObjectNode();

        // 테스트기 가이드 관련 버튼인 경우 데이터를 전송하지 않음
        if (isTestGuideButton(buttonId)) {
            return userInfoNode; // 빈 객체 반환
        }

        // 요약 정보 변환
        if (userData.containsKey("summary")) {
            ObjectNode summaryNode = objectMapper.createObjectNode();
            Map<String, Object> summaryData = (Map<String, Object>) userData.get("summary");

            if (summaryData != null) {
                // 생리 정보 변환
                if (summaryData.containsKey("menstrual")) {
                    Map<String, Object> menstrualData = (Map<String, Object>) summaryData.get("menstrual");
                    ObjectNode menstrualNode = objectMapper.createObjectNode();

                    if (menstrualData.containsKey("normal")) {
                        menstrualNode.put("생리주기_정상여부", (Boolean) menstrualData.get("normal"));
                    }

                    if (menstrualData.containsKey("bleeding_level")) {
                        menstrualNode.put("출혈_강도", menstrualData.get("bleeding_level").toString());
                    }

                    if (menstrualData.containsKey("symptom")) {
                        List<String> symptoms = (List<String>) menstrualData.get("symptom");
                        if (symptoms != null && !symptoms.isEmpty()) {
                            menstrualNode.set("증상", objectMapper.valueToTree(symptoms));
                        }
                    }

                    summaryNode.set("생리정보", menstrualNode);
                }

                // 스트레스 정보 변환
                if (summaryData.containsKey("stress")) {
                    Map<String, Object> stressData = (Map<String, Object>) summaryData.get("stress");
                    ObjectNode stressNode = objectMapper.createObjectNode();

                    if (stressData.containsKey("normal")) {
                        stressNode.put("스트레스_정상여부", (Boolean) stressData.get("normal"));
                    }

                    if (stressData.containsKey("stress")) {
                        stressNode.put("스트레스_메시지", stressData.get("stress").toString());
                    }

                    summaryNode.set("스트레스", stressNode);
                }

                // 호르몬 수치 변환
                if (summaryData.containsKey("hormoneLevels")) {
                    Map<String, Object> hormoneLevels = (Map<String, Object>) summaryData.get("hormoneLevels");
                    ObjectNode hormoneNode = objectMapper.createObjectNode();

                    for (Map.Entry<String, Object> entry : hormoneLevels.entrySet()) {
                        String koreanKey;
                        switch (entry.getKey()) {
                            case "estrogen":
                                koreanKey = "에스트로겐";
                                break;
                            case "progesterone":
                                koreanKey = "프로게스테론";
                                break;
                            case "lh":
                                koreanKey = "황체형성호르몬(LH)";
                                break;
                            case "fsh":
                                koreanKey = "난포자극호르몬(FSH)";
                                break;
                            default:
                                koreanKey = entry.getKey();
                        }
                        hormoneNode.put(koreanKey, entry.getValue().toString());
                    }

                    summaryNode.set("호르몬_수치", hormoneNode);
                }

                // 증상 정보 변환
                if (summaryData.containsKey("symptoms")) {
                    List<String> symptoms = (List<String>) summaryData.get("symptoms");
                    if (symptoms != null && !symptoms.isEmpty()) {
                        summaryNode.set("최근_증상", objectMapper.valueToTree(symptoms));
                    }
                }

                // 호르몬 상태 변환
                if (summaryData.containsKey("cycleStatus")) {
                    summaryNode.put("생리주기_상태", summaryData.get("cycleStatus").toString());
                }

                userInfoNode.set("보고서", summaryNode);
            }
        }

        // 생리 정보 변환
        if (userData.containsKey("menstrualInfo")) {
            Map<String, Object> menstrualInfo = (Map<String, Object>) userData.get("menstrualInfo");
            ObjectNode menstrualInfoNode = objectMapper.createObjectNode();

            if (menstrualInfo.containsKey("cycle")) {
                menstrualInfoNode.put("생리주기_길이", (Integer) menstrualInfo.get("cycle"));
            }

            if (menstrualInfo.containsKey("period")) {
                menstrualInfoNode.put("생리_일수", (Integer) menstrualInfo.get("period"));
            }

            if (menstrualInfo.containsKey("is_cycle_normal")) {
                boolean isCycleNormal = (Boolean) menstrualInfo.get("is_cycle_normal");
                menstrualInfoNode.put("생리주기_규칙성", isCycleNormal ? "규칙적" : "불규칙적");
            }

            if (menstrualInfo.containsKey("is_period_normal")) {
                boolean isPeriodNormal = (Boolean) menstrualInfo.get("is_period_normal");
                menstrualInfoNode.put("생리기간_정상여부", isPeriodNormal ? "정상" : "비정상");
            }

            userInfoNode.set("생리주기_정보", menstrualInfoNode);
        }

        // 최근 생리 정보 변환
        if (userData.containsKey("recentMenstrual")) {
            Map<String, Object> recentMenstrual = (Map<String, Object>) userData.get("recentMenstrual");
            ObjectNode recentMenstrualNode = objectMapper.createObjectNode();

            if (recentMenstrual.containsKey("average_cycle")) {
                recentMenstrualNode.put("평균_생리주기", (Integer) recentMenstrual.get("average_cycle"));
            }

            if (recentMenstrual.containsKey("max_cycle")) {
                recentMenstrualNode.put("최대_생리주기", (Integer) recentMenstrual.get("max_cycle"));
            }

            if (recentMenstrual.containsKey("cycle_record")) {
                List<Map<String, Object>> cycleRecords = (List<Map<String, Object>>) recentMenstrual.get("cycle_record");
                if (cycleRecords != null && !cycleRecords.isEmpty()) {
                    Map<String, Object> mostRecentCycle = cycleRecords.get(0);

                    if (mostRecentCycle.containsKey("start_date")) {
                        recentMenstrualNode.put("최근_생리시작일", mostRecentCycle.get("start_date").toString());
                    }

                    if (mostRecentCycle.containsKey("period")) {
                        recentMenstrualNode.put("최근_생리기간", (Integer) mostRecentCycle.get("period"));
                    }
                }
            }

            userInfoNode.set("최근_생리_정보", recentMenstrualNode);
        }

        // 배란 테스트 정보 변환
        if (userData.containsKey("ovulationTest")) {
            Map<String, Object> ovulationTest = (Map<String, Object>) userData.get("ovulationTest");
            ObjectNode ovulationTestNode = objectMapper.createObjectNode();

            if (ovulationTest.containsKey("type")) {
                ovulationTestNode.put("테스트_유형", (Integer) ovulationTest.get("type"));
            }

            if (ovulationTest.containsKey("personal_data")) {
                List<Map<String, Object>> personalData = (List<Map<String, Object>>) ovulationTest.get("personal_data");
                if (personalData != null && !personalData.isEmpty()) {
                    ovulationTestNode.set("배란_테스트_결과", convertOvulationTestData(personalData));
                }
            }

            userInfoNode.set("배란_테스트", ovulationTestNode);
        }

        // 생리 예측 정보 변환
        if (userData.containsKey("menstrualPrediction")) {
            Map<String, Object> prediction = (Map<String, Object>) userData.get("menstrualPrediction");
            ObjectNode predictionNode = objectMapper.createObjectNode();

            if (prediction.containsKey("start_date")) {
                predictionNode.put("예상_생리시작일", prediction.get("start_date").toString());
            }

            if (prediction.containsKey("end_date")) {
                predictionNode.put("예상_생리종료일", prediction.get("end_date").toString());
            }

            userInfoNode.set("생리_예측", predictionNode);
        }

        // 가임기 정보 변환
        if (userData.containsKey("bearingPeriod")) {
            Map<String, Object> bearingPeriod = (Map<String, Object>) userData.get("bearingPeriod");
            ObjectNode bearingNode = objectMapper.createObjectNode();

            if (bearingPeriod.containsKey("start_date")) {
                bearingNode.put("가임기_시작일", bearingPeriod.get("start_date").toString());
            }

            if (bearingPeriod.containsKey("end_date")) {
                bearingNode.put("가임기_종료일", bearingPeriod.get("end_date").toString());
            }

            userInfoNode.set("가임기_정보", bearingNode);
        }

        // 병원 예약 정보 변환
        if (userData.containsKey("hospitalReservation")) {
            Map<String, Object> reservation = (Map<String, Object>) userData.get("hospitalReservation");
            if (reservation.containsKey("reservation")) {
                userInfoNode.put("병원_예약_정보", reservation.get("reservation").toString());
            }
        }

        // 약물 정보 변환
        if (userData.containsKey("medication")) {
            Map<String, Object> medication = (Map<String, Object>) userData.get("medication");
            ObjectNode medicationNode = objectMapper.createObjectNode();

            // 현재 복용 중인 약물
            if (medication.containsKey("today_medicine")) {
                Set<Map<String, Object>> todayMedicine = (Set<Map<String, Object>>) medication.get("today_medicine");
                if (todayMedicine != null && !todayMedicine.isEmpty()) {
                    List<String> medicineNames = new ArrayList<>();
                    for (Map<String, Object> med : todayMedicine) {
                        if (med.containsKey("name")) {
                            medicineNames.add(med.get("name").toString());
                        }
                    }
                    medicationNode.set("현재_복용_약물", objectMapper.valueToTree(medicineNames));
                }
            }

            // 과거 복용 약물
            if (medication.containsKey("medicine_record")) {
                List<Map<String, Object>> medicineRecord = (List<Map<String, Object>>) medication.get("medicine_record");
                if (medicineRecord != null && !medicineRecord.isEmpty()) {
                    List<String> medicineNames = new ArrayList<>();
                    for (Map<String, Object> med : medicineRecord) {
                        if (med.containsKey("name")) {
                            medicineNames.add(med.get("name").toString());
                        }
                    }
                    medicationNode.set("과거_복용_약물", objectMapper.valueToTree(medicineNames));
                }
            }

            userInfoNode.set("약물_정보", medicationNode);
        }

        // 남은 일수 정보 변환
        if (userData.containsKey("remainDay")) {
            Map<String, Object> remainDay = (Map<String, Object>) userData.get("remainDay");
            ObjectNode remainDayNode = objectMapper.createObjectNode();

            if (remainDay.containsKey("predicted_menstrual")) {
                Map<String, Object> predictedMenstrual = (Map<String, Object>) remainDay.get("predicted_menstrual");
                if (predictedMenstrual.containsKey("start_date")) {
                    remainDayNode.put("다음_생리_예정일", predictedMenstrual.get("start_date").toString());
                }
            }

            if (remainDay.containsKey("ovulation_day")) {
                remainDayNode.put("배란일", remainDay.get("ovulation_day").toString());
            }

            if (remainDay.containsKey("childbearing_period")) {
                remainDayNode.put("가임기", remainDay.get("childbearing_period").toString());
            }

            if (remainDay.containsKey("PMS")) {
                remainDayNode.put("PMS_예상일", remainDay.get("PMS").toString());
            }

            userInfoNode.set("주요_일정", remainDayNode);
        }

        return userInfoNode;
    }

    /**
     * 배란 테스트 데이터를 변환
     */
    private JsonNode convertOvulationTestData(List<Map<String, Object>> testData) {
        List<ObjectNode> convertedData = new ArrayList<>();

        for (Map<String, Object> entry : testData) {
            ObjectNode testEntry = objectMapper.createObjectNode();
            if (entry.containsKey("date")) {
                testEntry.put("테스트_일자", entry.get("date").toString());

                // LH 수치 값을 설명으로 변환
                if (entry.containsKey("value")) {
                    double value = 0;
                    if (entry.get("value") instanceof Number) {
                        value = ((Number) entry.get("value")).doubleValue();
                    } else if (entry.get("value") instanceof String) {
                        try {
                            value = Double.parseDouble((String) entry.get("value"));
                        } catch (NumberFormatException e) {
                            log.warn("배란 테스트 값을 숫자로 변환할 수 없습니다: {}", entry.get("value"));
                        }
                    }
                    String result = value > 0.9 ? "양성" : "음성";
                    testEntry.put("배란_테스트_결과", result);
                    testEntry.put("LH_수치", value);
                }

                convertedData.add(testEntry);
            }
        }

        return objectMapper.valueToTree(convertedData);
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