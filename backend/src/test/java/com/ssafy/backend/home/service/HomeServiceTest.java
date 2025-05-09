package com.ssafy.backend.home.service;

import com.mysema.commons.lang.Assert;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("HomeService 테스트합니다")
@ExtendWith(MockitoExtension.class)
public class HomeServiceTest {
    @Mock
    private HomeService homeService;

    @InjectMocks
    private HomeServiceTest homeServiceTest;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .userId(1L)
                .build();
    }

    @Test
    @DisplayName("다음 생리 주기 예측일")
    public void getRemainDay(){
        ApiResponse<?> response = homeService.getRemainDay(testUser);


    }

}
