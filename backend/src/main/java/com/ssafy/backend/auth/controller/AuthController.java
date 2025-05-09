package com.ssafy.backend.auth.controller;


import com.ssafy.backend.auth.dto.KakaoLoginRequest;
import com.ssafy.backend.auth.dto.LoginResponse;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.ssafy.backend.auth.dto.RefreshTokenRequest;
import com.ssafy.backend.auth.dto.TokenResponse;
import com.ssafy.backend.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ApiResponse<TokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        return ApiResponse.success("리프레쉬 토큰이 재발급되었습니다.", HttpStatus.OK, authService.refreshAccessToken(request));
    }

    @PostMapping("/kakao")
    public ApiResponse<LoginResponse> kakaoLogin(@RequestBody KakaoLoginRequest request) {
        return ApiResponse.success(
                "카카오 로그인 성공",
                HttpStatus.OK,
                authService.kakaoLogin(request.getAccessToken())
        );
    }

}