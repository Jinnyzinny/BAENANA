package com.ssafy.backend.calendar.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("캘린더 Controller 전체를 테스트한다.")
@WebMvcTest(controllers = CalendarController.class)
@AutoConfigureMockMvc
public class CalendarControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("산부인과의 예약일정 열람 테스트 코드")
    public void getReservationTest() throws Exception {
        mockMvc.perform(get("/api/calendar/ob_gyn")
                        .with(oauth2Login()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("약 복용 일정 열람 테스트 코드")
    public void getMedicationTest() throws Exception {
        mockMvc.perform(get("/api/calendar/medication/{year}/{month}", 2024, 8)
                        .with(oauth2Login()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("생리 주기 열람 테스트 코드")
    public void getCycleTest() throws Exception {
        mockMvc.perform(get("/api/calendar/menstrual_cycle/{year}/{month}", 2024, 8)
                        .with(oauth2Login()))
                .andExpect(status().isOk());
    }
}
