package com.ssafy.backend.auth.controller;


import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    // JWT로 인증된 사용자 정보 확인 -> 나중에 삭제
    @GetMapping("/me")
    public String getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return "인증되지 않은 사용자입니다.";
        }

        return "현재 로그인한 사용자 ID: " + user.getUserId() + ", 소셜ID: " + user.getSocialId();
    }

}