package com.ssafy.backend.chatbot.config;

import lombok.RequiredArgsConstructor;
import com.ssafy.backend.chatbot.dto.ButtonDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 챗봇 관련 설정 클래스
 */
@Configuration
@RequiredArgsConstructor
public class ChatBotConfig {

    /**
     * 메인 버튼 목록 정의
     */
    @Bean
    public List<ButtonDto> mainButtons() {
        return List.of(
                ButtonDto.builder()
                        .id("hormone_analysis")
                        .text("호르몬 패턴 분석")
                        .type("Navigation")
                        .build(),
                ButtonDto.builder()
                        .id("period_prediction")
                        .text("생리주기 예측")
                        .type("Navigation")
                        .build(),
                ButtonDto.builder()
                        .id("test_guide")
                        .text("테스트기 가이드")
                        .type("Navigation")
                        .build(),
                ButtonDto.builder()
                        .id("pregnancy_guide")
                        .text("임신 준비 가이드")
                        .type("Navigation")
                        .build(),
                ButtonDto.builder()
                        .id("health_info")
                        .text("건강 정보 검색")
                        .type("Navigation")
                        .build(),
                ButtonDto.builder()
                        .id("service_guide")
                        .text("서비스 사용 가이드")
                        .type("Navigation")
                        .build()
        );
    }

    /**
     * 서브 버튼 목록 정의
     */
    @Bean
    public Map<String, List<ButtonDto>> subButtons() {
        Map<String, List<ButtonDto>> subButtonsMap = new HashMap<>();

        // 호르몬 패턴 분석 서브 버튼
        subButtonsMap.put("hormone_analysis", List.of(
                ButtonDto.builder().id("pattern_analysis").text("패턴 분석 결과 보기").type("Rule").parentId("hormone_analysis").build(),
                ButtonDto.builder().id("pattern_management").text("패턴별 관리법").type("RAG").parentId("hormone_analysis").build(),
                ButtonDto.builder().id("hormone_balance").text("호르몬 균형 관리").type("RAG").parentId("hormone_analysis").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        // 생리주기 예측 서브 버튼
        subButtonsMap.put("period_prediction", List.of(
                ButtonDto.builder().id("next_period").text("다음 월경일 예측").type("Rule").parentId("period_prediction").build(),
                ButtonDto.builder().id("ovulation_prediction").text("배란일 예측").type("Rule").parentId("period_prediction").build(),
                ButtonDto.builder().id("cycle_irregularity").text("주기 불규칙성 분석").type("Rule").parentId("period_prediction").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        // 테스트기 가이드 서브 버튼
        subButtonsMap.put("test_guide", List.of(
                ButtonDto.builder().id("ovulation_test_usage").text("배란 테스트기 사용법").type("Rule").parentId("test_guide").build(),
                ButtonDto.builder().id("ovulation_test_caution").text("배란 테스트기 주의사항").type("Rule").parentId("test_guide").build(),
                ButtonDto.builder().id("pregnancy_test_usage").text("임신 테스트기 사용법").type("Rule").parentId("test_guide").build(),
                ButtonDto.builder().id("pregnancy_test_caution").text("임신 테스트기 주의사항").type("Rule").parentId("test_guide").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        // 임신 준비 가이드 서브 버튼
        subButtonsMap.put("pregnancy_guide", List.of(
                ButtonDto.builder().id("pregnancy_possibility").text("임신 가능성 확인").type("Rule").parentId("pregnancy_guide").build(),
                ButtonDto.builder().id("pregnancy_health_tips").text("임신 준비 건강 관리").type("RAG").parentId("pregnancy_guide").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        // 건강 정보 검색 서브 버튼
        subButtonsMap.put("health_info", List.of(
                ButtonDto.builder().id("anxiety_tips").text("불안 완화 팁").type("RAG").parentId("health_info").build(),
                ButtonDto.builder().id("fatigue_management").text("피로 관리 팁").type("RAG").parentId("health_info").build(),
                ButtonDto.builder().id("ovulation_period_qa").text("배란·생리 Q&A").type("RAG").parentId("health_info").build(),
                ButtonDto.builder().id("nutrition_tips").text("여성 영양 관리 팁").type("RAG").parentId("health_info").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        // 서비스 사용 가이드 서브 버튼
        subButtonsMap.put("service_guide", List.of(
                ButtonDto.builder().id("app_faq").text("앱 사용법 FAQ").type("Rule").parentId("service_guide").build(),
                ButtonDto.builder().id("back_to_main").text("처음으로 돌아가기").type("Navigation").build()
        ));

        return subButtonsMap;
    }
}