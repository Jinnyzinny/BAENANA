package com.ssafy.backend.home.controller;

import com.ssafy.backend.home.service.HomeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@DisplayName("Home Controller 테스트 한다")
@WebMvcTest(controllers = HomeController.class)
public class HomeControllerTest {
    @BeforeEach
    public void setUp() throws Exception {
        System.out.println("테스트 시작한다");
    }

    @Autowired
    MockMvc mvc;

    @MockitoBean
    HomeService homeService;
}
