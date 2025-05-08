package com.ssafy.backend.auth.controller;


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

    // JWT로 인증된 사용자 정보 확인 -> 나중에 삭제
    @GetMapping("/me")
    public String getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return "인증되지 않은 사용자입니다.";
        }

        return "현재 로그인한 사용자 ID: " + user.getUserId() + ", 소셜ID: " + user.getSocialId();
    }

}