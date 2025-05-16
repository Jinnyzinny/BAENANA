package com.ssafy.backend.home.controller;

import com.ssafy.backend.home.service.HomeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Home Controller 테스트")
@WebMvcTest(controllers = HomeController.class)
@AutoConfigureMockMvc
public class HomeControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private HomeService homeService;  // ✅ 이거 꼭 필요함!

    @Test
    @DisplayName("홈화면에서 생리 예측일 출력 확인")
    public void testHomeRemainDay() throws Exception {
        mockMvc.perform(
                        get("/api/home/remain_day")
                                .with(oauth2Login()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("홈화면에서 병원 예약 메시지 출력 확인")
    public void testHomeHospital() throws Exception {
        mockMvc.perform(
                        get("/api/home/reservation")
                                .with(oauth2Login()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("홈화면에서 의약품 메시지 출력 확인")
    public void testHomeMedication() throws Exception {
        mockMvc.perform(
                        get("/api/home/medicine")
                                .with(oauth2Login()))
                .andExpect(status().isOk());
    }
}
