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
import com.ssafy.backend.medication.repository.MedicationRepository;
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
    private final MedicationRepository medicationRepository;

    @Value("${python.service.url}")
    private String pythonServiceUrl;

    /**
     * RAG 서비스 호출 메서드
     * 사용자 데이터를 수집하고 Python 서비스로 전송
     */
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
            log.error("RAG 서비스 호출 오류: {}", e.getMessage(), e);
            throw new RuntimeException("RAG 서비스 호출 오류: " + e.getMessage(), e);
        }
    }

    /**
     * 사용자 데이터를 수집하여 Python 서비스에 전달할 데이터 맵 생성
     * 개선된 버전: 모듈화, 예외 처리 강화, 데이터 통합
     */
    private Map<String, Object> collectUserData(User user) {
        Map<String, Object> userData = new HashMap<>();

        // 기본 사용자 정보 설정 (항상 포함되도록)
        userData.put("user_id", user.getUserId());
        userData.put("name", "사용자");  // 기본값, 실제 이름은 필요시 추가

        try {
            // 모듈화된 데이터 수집 함수 호출
            collectBasicUserInfo(user, userData);
            collectMenstrualCycleData(user, userData);
            collectSymptomData(user, userData);
            collectOvulationTestData(user, userData);
            collectMedicationData(user, userData);

            // 통합 데이터 생성 (생리 주기 + 배란 테스트 데이터)
            integrateReproductiveData(userData);

            log.info("사용자(ID: {})의 데이터 수집 완료", user.getUserId());
        } catch (Exception e) {
            // 오류 발생 시 세부적인 로깅
            log.error("사용자(ID: {})의 데이터 수집 중 오류: {}", user.getUserId(), e.getMessage());

            // 오류 세부 정보를 로깅 (개발/디버깅 시 유용)
            log.debug("오류 세부 정보:", e);

            // 오류 유형 기록
            userData.put("error_type", e.getClass().getSimpleName());
            userData.put("error_message", e.getMessage());

            // 오류 발생 시에도 기본 정보는 유지 (user_id는 이미 설정되어 있음)
            // 가능한 경우 부분적인 데이터 제공 시도
            if (!userData.containsKey("period_records")) {
                userData.put("period_records", Collections.emptyList());
            }

            if (!userData.containsKey("symptom_records")) {
                userData.put("symptom_records", Collections.emptyList());
            }

            if (!userData.containsKey("hormone_tests")) {
                userData.put("hormone_tests", Collections.emptyList());
            }

            // Python에서 오류 상황 처리할 수 있도록 플래그 설정
            userData.put("data_incomplete", true);
        }

        return userData;
    }

    /**
     * 기본 사용자 정보 수집
     */
    private void collectBasicUserInfo(User user, Map<String, Object> userData) {
        // 여기서는 필요시 사용자 테이블에서 추가 정보를 가져올 수 있음
        // 예: 나이, 이름 등
    }

    /**
     * 생리 주기 데이터 수집
     */
    private void collectMenstrualCycleData(User user, Map<String, Object> userData) {
        try {
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
                    long daysBetween = cycle.getStartDate().until(cycle.getEndDate()).getDays() + 1; // +1 추가 (포함일 계산)
                    cycleData.put("days", String.valueOf(daysBetween));

                    // 생리 주기 ID 추가 (추적 및 참조용)
                    cycleData.put("cycle_id", String.valueOf(cycle.getCycleId()));

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
            } else {
                // 생리 주기 데이터가 없는 경우 빈 리스트로 초기화
                userData.put("period_records", Collections.emptyList());

                // Python이 이 상황을 인지할 수 있도록 플래그 설정
                userData.put("no_period_data", true);
                log.info("사용자(ID: {})의 생리 주기 데이터가 없습니다", user.getUserId());
            }
        } catch (Exception e) {
            log.error("생리 주기 데이터 수집 중 오류: {}", e.getMessage(), e);
            userData.put("period_records", Collections.emptyList());
            userData.put("period_data_error", e.getMessage());
            throw new RuntimeException("생리 주기 데이터 수집 실패", e);
        }
    }

    /**
     * 증상 데이터 수집
     */
    private void collectSymptomData(User user, Map<String, Object> userData) {
        try {
            // 최근 생리 주기의 증상 데이터 수집
            Optional<List<MenstrualCycle>> menstrualCyclesOpt =
                    menstrualCycleRepository.findByUser_UserIdOrderByStartDateDesc(user.getUserId());

            List<Map<String, Object>> symptomRecords = new ArrayList<>();

            if (menstrualCyclesOpt.isPresent() && !menstrualCyclesOpt.get().isEmpty()) {
                List<MenstrualCycle> menstrualCycles = menstrualCyclesOpt.get();

                // 최근 3개월 증상 데이터만 확인
                LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
                for (MenstrualCycle cycle : menstrualCycles) {
                    if (cycle.getStartDate().isAfter(threeMonthsAgo)) {
                        cycle.getLogs().forEach(dailyLog -> {
                            if (!dailyLog.getSymptomLog().isEmpty()) {
                                Map<String, Object> symptomData = new HashMap<>();
                                symptomData.put("date", dailyLog.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                                symptomData.put("cycle_id", cycle.getCycleId()); // 관련 주기 ID 추가

                                List<String> symptoms = new ArrayList<>();
                                dailyLog.getSymptomLog().forEach(symptom ->
                                        symptoms.add(symptom.getSymptomType().getDescription())
                                );

                                symptomData.put("symptoms", symptoms);
                                symptomData.put("bleeding_level", dailyLog.getBleedingLevel());
                                symptomData.put("pain_level", dailyLog.getPainLevel());

                                // 스트레스 수준 추가 (있는 경우)
                                if (dailyLog.getStressLevel() != null) {
                                    symptomData.put("stress_level", dailyLog.getStressLevel());
                                }

                                symptomRecords.add(symptomData);
                            }
                        });
                    }
                }
            }

            userData.put("symptom_records", symptomRecords);
        } catch (Exception e) {
            log.error("증상 데이터 수집 중 오류: {}", e.getMessage(), e);
            userData.put("symptom_records", Collections.emptyList());
            userData.put("symptom_data_error", e.getMessage());
            // 증상 데이터는 선택적이므로 예외를 전파하지 않음
        }
    }

    /**
     * 배란 테스트 데이터 수집
     */
    private void collectOvulationTestData(User user, Map<String, Object> userData) {
        try {
            List<Map<String, Object>> recentTests = new ArrayList<>();

            // 사용자의 특정 날짜 이후 테스트 결과 조회 (최근 3개월)
            LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
            Optional<List<OvulationTest>> testsOpt = ovulationTestRepository.findByUserAndDateAfter(user, threeMonthsAgo);

            if (testsOpt.isPresent() && !testsOpt.get().isEmpty()) {
                List<OvulationTest> tests = testsOpt.get();

                // 날짜 기준 내림차순 정렬 후 최대 10개만 사용
                tests.sort((a, b) -> b.getDate().compareTo(a.getDate()));
                List<OvulationTest> recentTestList = tests.stream().limit(10).collect(Collectors.toList());

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                for (OvulationTest test : recentTestList) {
                    Map<String, Object> testData = new HashMap<>();

                    // 날짜 형식 변환
                    testData.put("date", test.getDate().format(formatter));
                    testData.put("value", test.getValue());
                    testData.put("test_id", test.getOvulationTestId()); // 수정: getTestId() -> getOvulationTestId()

                    // LH 테스트 결과 판정 (임계값 50으로 가정)
                    String result = test.getValue() >= 50 ? "positive" : "negative";
                    testData.put("result", result);
                    testData.put("type", "LH");

                    // 관련된 생리 주기 검색 및 추가
                    // 테스트 날짜가 속하는 주기 찾기
                    try {
                        // 수정: 기존 메서드 대체
                        Optional<MenstrualCycle> relatedCycle = findCycleContainingDate(user.getUserId(), test.getDate());

                        if (relatedCycle.isPresent()) {
                            testData.put("related_cycle_id", relatedCycle.get().getCycleId());
                        }
                    } catch (Exception e) {
                        log.warn("테스트와 관련된 주기 검색 중 오류: {}", e.getMessage());
                        // 관련 주기 없이 진행
                    }

                    recentTests.add(testData);
                }
            }

            userData.put("hormone_tests", recentTests);
        } catch (Exception e) {
            log.error("배란 테스트 데이터 수집 중 오류: {}", e.getMessage(), e);
            userData.put("hormone_tests", Collections.emptyList());
            userData.put("hormone_test_error", e.getMessage());
            throw new RuntimeException("배란 테스트 데이터 수집 실패", e);
        }
    }

    /**
     * 주어진 날짜를 포함하는 생리 주기 찾기
     * findFirstByUser_UserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual 메서드 대체
     */
    private Optional<MenstrualCycle> findCycleContainingDate(Long userId, LocalDate date) {
        Optional<List<MenstrualCycle>> cyclesOpt = menstrualCycleRepository.findByUser_UserId(userId);

        if (cyclesOpt.isPresent()) {
            return cyclesOpt.get().stream()
                    .filter(cycle ->
                            (cycle.getStartDate().isEqual(date) || cycle.getStartDate().isBefore(date)) &&
                                    (cycle.getEndDate().isEqual(date) || cycle.getEndDate().isAfter(date)))
                    .findFirst();
        }

        return Optional.empty();
    }

    /**
     * 약물 데이터 수집
     */
    private void collectMedicationData(User user, Map<String, Object> userData) {
        try {
            // 현재 복용 중인 약물 조회 (종료일이 현재 이후인 약물)
            LocalDate today = LocalDate.now();
            Optional<List<com.ssafy.backend.medication.entity.Medication>> medicationsOpt =
                    medicationRepository.findDistinctByUser_UserIdAndEndDateAfter(user.getUserId(), today);

            if (medicationsOpt.isPresent() && !medicationsOpt.get().isEmpty()) {
                List<Map<String, Object>> medicationList = new ArrayList<>();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                for (com.ssafy.backend.medication.entity.Medication med : medicationsOpt.get()) {
                    Map<String, Object> medData = new HashMap<>();
                    medData.put("name", med.getName());
                    medData.put("start_date", med.getStartDate().format(formatter));
                    medData.put("end_date", med.getEndDate().format(formatter));
                    medData.put("description", med.getDescription());

                    // 복용 시간 정보 추가
                    List<String> timeTaken = med.getTimeTakenList().stream()
                            .map(time -> time.getTime_taken().toString())
                            .collect(Collectors.toList());

                    medData.put("time_taken", timeTaken);
                    medicationList.add(medData);
                }

                userData.put("medications", medicationList);
            } else {
                userData.put("medications", Collections.emptyList());
            }
        } catch (Exception e) {
            log.error("약물 데이터 수집 중 오류: {}", e.getMessage(), e);
            // 약물 데이터는 핵심이 아니므로 예외를 던지지 않고 빈 리스트로 설정
            userData.put("medications", Collections.emptyList());
            userData.put("medication_data_error", e.getMessage());
        }
    }

    /**
     * 생식 건강 통합 데이터 생성 (생리 주기 + 배란 테스트 데이터)
     */
    private void integrateReproductiveData(Map<String, Object> userData) {
        try {
            // 주기 데이터와 배란 테스트 데이터가 있는 경우만 통합
            if (!userData.containsKey("period_records") || !userData.containsKey("hormone_tests")) {
                return;
            }

            @SuppressWarnings("unchecked")
            List<Map<String, String>> periodRecords = (List<Map<String, String>>) userData.get("period_records");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> hormoneTests = (List<Map<String, Object>>) userData.get("hormone_tests");

            if (periodRecords.isEmpty() || hormoneTests.isEmpty()) {
                return;
            }

            // 통합 데이터 구조 생성
            List<Map<String, Object>> integratedCycles = new ArrayList<>();

            for (Map<String, String> cycle : periodRecords) {
                String cycleId = cycle.get("cycle_id");
                if (cycleId == null) continue;

                Map<String, Object> integratedCycle = new HashMap<>();
                integratedCycle.put("cycle_id", cycleId);
                integratedCycle.put("start_date", cycle.get("start_date"));
                integratedCycle.put("end_date", cycle.get("end_date"));
                integratedCycle.put("duration", cycle.get("days"));

                // 이 주기에 관련된 호르몬 테스트 찾기
                List<Map<String, Object>> relatedTests = hormoneTests.stream()
                        .filter(test -> {
                            // 관련 주기 ID로 연결된 테스트 찾기
                            Object relatedCycleId = test.get("related_cycle_id");
                            if (relatedCycleId != null && relatedCycleId.toString().equals(cycleId)) {
                                return true;
                            }

                            // 아니면 날짜 기반으로 테스트가 주기 내에 있는지 확인
                            try {
                                LocalDate testDate = LocalDate.parse(test.get("date").toString());
                                LocalDate cycleStart = LocalDate.parse(cycle.get("start_date"));
                                LocalDate cycleEnd = LocalDate.parse(cycle.get("end_date"));

                                // 테스트 날짜가 주기 기간 내에 있거나, 주기 시작일로부터 14일 이내인지 확인
                                // (여포기와 배란기 기간 포함)
                                return (testDate.isEqual(cycleStart) || testDate.isAfter(cycleStart)) &&
                                        (testDate.isEqual(cycleEnd) || testDate.isBefore(cycleEnd)) ||
                                        (testDate.isAfter(cycleStart) &&
                                                testDate.isBefore(cycleStart.plusDays(14)));
                            } catch (Exception e) {
                                return false;
                            }
                        })
                        .collect(Collectors.toList());

                integratedCycle.put("hormone_tests", relatedTests);

                // 배란 가능성 분석
                boolean hasPositiveLh = relatedTests.stream()
                        .anyMatch(test -> "positive".equals(test.get("result")));

                integratedCycle.put("ovulation_detected", hasPositiveLh);

                // 이 주기에 관련된 증상 찾기
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> symptomRecords = (List<Map<String, Object>>) userData.get("symptom_records");
                if (symptomRecords != null && !symptomRecords.isEmpty()) {
                    List<Map<String, Object>> relatedSymptoms = symptomRecords.stream()
                            .filter(symptom -> {
                                // 관련 주기 ID로 연결
                                Object relatedCycleId = symptom.get("cycle_id");
                                if (relatedCycleId != null && relatedCycleId.toString().equals(cycleId)) {
                                    return true;
                                }

                                // 아니면 날짜 기반 확인
                                try {
                                    LocalDate symptomDate = LocalDate.parse(symptom.get("date").toString());
                                    LocalDate cycleStart = LocalDate.parse(cycle.get("start_date"));
                                    LocalDate cycleEnd = LocalDate.parse(cycle.get("end_date"));

                                    return (symptomDate.isEqual(cycleStart) || symptomDate.isAfter(cycleStart)) &&
                                            (symptomDate.isEqual(cycleEnd) || symptomDate.isBefore(cycleEnd));
                                } catch (Exception e) {
                                    return false;
                                }
                            })
                            .collect(Collectors.toList());

                    integratedCycle.put("symptoms", relatedSymptoms);
                }

                integratedCycles.add(integratedCycle);
            }

            // 통합 데이터 추가
            userData.put("integrated_cycles", integratedCycles);
        } catch (Exception e) {
            log.error("생식 건강 통합 데이터 생성 중 오류: {}", e.getMessage(), e);
            // 통합 데이터는 추가 기능이므로 예외 발생 시 건너뜀
        }
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