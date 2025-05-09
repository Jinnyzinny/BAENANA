package com.ssafy.backend.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoLoginRequest {
    private String accessToken;  // RN에서 받은 카카오 액세스 토큰
}