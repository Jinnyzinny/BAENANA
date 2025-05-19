package com.ssafy.backend.common.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    @GetMapping("/auth")
    public ResponseEntity<String> testAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.info("현재 인증 정보: {}", auth);

        if (auth != null && auth.isAuthenticated() &&
                !auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.ok("인증됨: " + auth.getName());
        } else {
            return ResponseEntity.ok("인증되지 않음 (anonymousUser)");
        }
    }

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        log.info("공개 엔드포인트 접근");
        return ResponseEntity.ok("공개 접근 성공 - 인증 없이 접근 가능");
    }

    @GetMapping("/debug")
    public ResponseEntity<String> debugSecurityContext() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String details = "인증 객체: " + auth +
                "\n인증됨: " + (auth != null ? auth.isAuthenticated() : "null") +
                "\n주체: " + (auth != null ? auth.getPrincipal() : "null") +
                "\n권한: " + (auth != null ? auth.getAuthorities() : "null");

        log.info(details.replace("\n", ", "));
        return ResponseEntity.ok(details);
    }
}