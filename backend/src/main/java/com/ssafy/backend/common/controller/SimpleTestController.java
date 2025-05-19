package com.ssafy.backend.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleTestController {

    @GetMapping("/test-no-auth")
    public String testNoAuth() {
        return "인증 없이 접근 성공!";
    }
}