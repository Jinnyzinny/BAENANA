package com.ssafy.backend.chatbot.client;

import com.ssafy.backend.chatbot.dto.ChatBotResponse;
import com.ssafy.backend.chatbot.dto.ChatRequest;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.ovulation_test.entity.OvulationTest;
import com.ssafy.backend.ovulation_test.repository.OvulationTestRepository;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class RagServiceClient {
    private final RestTemplate restTemplate;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final OvulationTestRepository ovulationTestRepository;

    @Value("${python.service.url}")
    private String pythonServiceUrl;

    public ChatBotResponse callRagService(User user, ChatRequest request) {
        try {
            // 사용자 데이터 추가
            Map<String, Object> userData = collectUserData(user);
            request.setUserData(userData);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);

            // Python FastAPI 서비스 호출
            ResponseEntity<ApiResponse<ChatBotResponse>> response =
                    restTemplate.postForEntity(
                            pythonServiceUrl + "/rag",
                            entity,
                            (Class<ApiResponse<ChatBotResponse>>) (Class<?>) ApiResponse.class
                    );

            if (response.getBody() != null && "SUCCESS".equals(response.getBody().getCode())) {
                return response.getBody().getData();
            } else {
                throw new RuntimeException("RAG 서비스 응답 오류: " +
                        (response.getBody() != null ? response.getBody().getMessage() : "응답 없음"));
            }
        } catch (Exception e) {
            throw new RuntimeException("RAG 서비스 호출 오류: " + e.getMessage(), e);
        }
    }

    /**
     * 사용자 데이터를 수집하여 Python 서비스에 전달할 데이터 맵 생성
     */
    private Map<String, Object> collectUserData(User user) {
        Map<String, Object> userData = new HashMap<>();

        try {
            // 1. 기본 사용자 정보
            userData.put("user_id", user.getUserId());
            userData.put("name", "사용자");  // 기본값, 실제 이름은 필요시 추가

            // 2. 생리 주기 데이터
            Optional<List<MenstrualCycle>> menstrualCyclesOpt =
                    menstrualCycleRepository.findByUser_UserIdOrderByStartDateDesc(user.getUserId());

            if (menstrualCyclesOpt.isPresent() && !menstrualCyclesOpt.get().isEmpty()) {
                List<MenstrualCycle> menstrualCycles = menstrualCyclesOpt.get();
                // 최근 6개로 제한
                List<MenstrualCycle> recentCycles = menstrualCycles.stream()
                        .limit(6)
                        .collect(Collectors.toList());

                List<Map<String, String>> periodRecords = new ArrayList<>();

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                for (MenstrualCycle cycle : recentCycles) {
                    Map<String, String> cycleData = new HashMap<>();
                    cycleData.put("start_date", cycle.getStartDate().format(formatter));
                    cycleData.put("end_date", cycle.getEndDate().format(formatter));

                    // 생리 일수 계산
                    long daysBetween = cycle.getStartDate().until(cycle.getEndDate()).getDays();
                    cycleData.put("days", String.valueOf(daysBetween));

                    periodRecords.add(cycleData);
                }

                userData.put("period_records", periodRecords);

                // 마지막 생리 시작일
                MenstrualCycle lastCycle = recentCycles.get(0);
                userData.put("last_period_date", lastCycle.getStartDate().format(formatter));

                // 평균 주기 계산 (두 생리 시작일 사이의 평균 일수)
                if (recentCycles.size() > 1) {
                    long totalDays = 0;
                    for (int i = 0; i < recentCycles.size() - 1; i++) {
                        LocalDate currentStartDate = recentCycles.get(i).getStartDate();
                        LocalDate nextStartDate = recentCycles.get(i + 1).getStartDate();
                        totalDays += currentStartDate.until(nextStartDate).getDays();
                    }

                    double avgCycle = (double) totalDays / (recentCycles.size() - 1);
                    userData.put("avg_cycle_length", avgCycle);

                    // 주기 규칙성 계산
                    double stdDev = calculateStdDev(recentCycles);
                    userData.put("cycle_regularity", determineRegularity(stdDev));
                    userData.put("cycle_std_dev", stdDev);
                }
            }

            // 3. 증상 데이터
            // 최근 생리 주기의 증상 데이터 수집
            if (menstrualCyclesOpt.isPresent() && !menstrualCyclesOpt.get().isEmpty()) {
                List<MenstrualCycle> menstrualCycles = menstrualCyclesOpt.get();
                List<Map<String, Object>> symptomRecords = new ArrayList<>();

                // 최근 3개월 증상 데이터만 확인
                LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
                for (MenstrualCycle cycle : menstrualCycles) {
                    if (cycle.getStartDate().isAfter(threeMonthsAgo)) {
                        cycle.getLogs().forEach(dailyLog -> {
                            if (!dailyLog.getSymptomLog().isEmpty()) {
                                Map<String, Object> symptomData = new HashMap<>();
                                symptomData.put("date", dailyLog.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

                                List<String> symptoms = new ArrayList<>();
                                dailyLog.getSymptomLog().forEach(symptom ->
                                        symptoms.add(symptom.getSymptomType().getDescription())
                                );

                                symptomData.put("symptoms", symptoms);
                                symptomData.put("bleeding_level", dailyLog.getBleedingLevel());
                                symptomData.put("pain_level", dailyLog.getPainLevel());

                                symptomRecords.add(symptomData);
                            }
                        });
                    }
                }

                userData.put("symptom_records", symptomRecords);
            }

            // 4. 배란 테스트 데이터
            // 최근 배란 테스트 결과 수집
            List<Map<String, Object>> recentTests = new ArrayList<>();

            try {
                // 사용자의 특정 날짜 이후 테스트 결과 조회 (최근 3개월)
                LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
                Optional<List<OvulationTest>> testsOpt = ovulationTestRepository.findByUserAndDateAfter(user, threeMonthsAgo);

                if (testsOpt.isPresent() && !testsOpt.get().isEmpty()) {
                    List<OvulationTest> tests = testsOpt.get();

                    // 날짜 기준 내림차순 정렬 후 최대 10개만 사용
                    tests.sort((a, b) -> b.getDate().compareTo(a.getDate()));
                    List<OvulationTest> recentTestList = tests.stream().limit(10).collect(Collectors.toList());

                    for (OvulationTest test : recentTestList) {
                        Map<String, Object> testData = new HashMap<>();

                        // 날짜 형식 변환
                        testData.put("date", test.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                        testData.put("value", test.getValue());

                        // LH 테스트 결과 판정 (임계값 50으로 가정)
                        String result = test.getValue() >= 50 ? "positive" : "negative";
                        testData.put("result", result);
                        testData.put("type", "LH");

                        recentTests.add(testData);
                    }
                }
            } catch (Exception e) {
                log.error("배란 테스트 데이터 수집 중 오류: {}", e.getMessage(), e);
            }

            userData.put("hormone_tests", recentTests);

            // 5. 임신 계획 여부 (데모 목적으로 기본값 설정)
            userData.put("pregnancy_planning", true);

        } catch (Exception e) {
            // 오류 발생 시 기본 사용자 데이터만 반환
            log.error("사용자 데이터 수집 중 오류: {}", e.getMessage(), e);
            userData.clear();
            userData.put("user_id", user.getUserId());
            userData.put("error", "사용자 데이터 수집 중 오류: " + e.getMessage());
        }

        return userData;
    }

    /**
     * 생리 주기의 표준편차 계산
     */
    private double calculateStdDev(List<MenstrualCycle> cycles) {
        if (cycles.size() <= 1) {
            return 0.0;
        }

        // 평균 계산
        long totalDays = 0;
        List<Integer> cycleLengths = new ArrayList<>();

        for (int i = 0; i < cycles.size() - 1; i++) {
            LocalDate currentStartDate = cycles.get(i).getStartDate();
            LocalDate nextStartDate = cycles.get(i + 1).getStartDate();
            int days = (int) currentStartDate.until(nextStartDate).getDays();
            cycleLengths.add(days);
            totalDays += days;
        }

        double mean = (double) totalDays / cycleLengths.size();

        // 분산 계산
        double variance = cycleLengths.stream()
                .mapToDouble(len -> Math.pow(len - mean, 2))
                .sum() / cycleLengths.size();

        // 표준편차 반환
        return Math.sqrt(variance);
    }

    /**
     * 표준편차를 기반으로 주기 규칙성 결정
     */
    private String determineRegularity(double stdDev) {
        if (stdDev <= 2) {
            return "매우 규칙적";
        } else if (stdDev <= 4) {
            return "규칙적";
        } else if (stdDev <= 7) {
            return "약간 불규칙";
        } else {
            return "불규칙";
        }
    }
}