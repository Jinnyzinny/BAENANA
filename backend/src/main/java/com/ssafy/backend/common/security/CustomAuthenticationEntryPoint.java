package com.ssafy.backend.common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.common.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // 경로에 따라 다른 메시지 반환
        String path = request.getRequestURI();
        ApiResponse<?> errorResponse;

        if (path.contains("/api/notifications/admin")) {
            errorResponse = ApiResponse.error("NOTIFICATION_UNAUTHORIZED",
                    HttpStatus.UNAUTHORIZED, "공지사항 관리를 위한 인증이 필요합니다.");
        } else if (path.contains("/api/faq/admin")) {
            errorResponse = ApiResponse.error("FAQ_UNAUTHORIZED",
                    HttpStatus.UNAUTHORIZED, "FAQ 관리를 위한 인증이 필요합니다.");
        } else if (path.contains("/api/inquiries/admin")) {
            errorResponse = ApiResponse.error("INQUIRY_ADMIN_UNAUTHORIZED",
                    HttpStatus.UNAUTHORIZED, "문의 답변 관리를 위한 관리자 인증이 필요합니다.");
        } else if (path.contains("/api/inquiries")) {
            errorResponse = ApiResponse.error("UNAUTHORIZED",
                    HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        } else {
            errorResponse = ApiResponse.error("UNAUTHORIZED",
                    HttpStatus.UNAUTHORIZED, "인증이 필요합니다.");
        }

        objectMapper.findAndRegisterModules(); // LocalDateTime 직렬화를 위해 필요
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}