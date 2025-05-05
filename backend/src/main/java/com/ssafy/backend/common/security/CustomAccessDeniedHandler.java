package com.ssafy.backend.common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.backend.common.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8"); // 한글 인코딩 문제 해결

        // ObjectMapper 설정
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"));
        // objectMapper.findAndRegisterModules(); // LocalDateTime 직렬화를 위해 필요

        // 경로에 따라 다른 메시지 반환
        String path = request.getRequestURI();
        ApiResponse<?> errorResponse;

        if (path.contains("/api/notifications/admin")) {
            errorResponse = ApiResponse.error("NOTIFICATION_ACCESS_DENIED",
                    HttpStatus.FORBIDDEN, "공지사항 관리 권한이 없습니다.");
        } else if (path.contains("/api/faq/admin")) {
            errorResponse = ApiResponse.error("FAQ_ACCESS_DENIED",
                    HttpStatus.FORBIDDEN, "FAQ 관리 권한이 없습니다.");
        } else if (path.contains("/api/inquiries/admin")) {
            errorResponse = ApiResponse.error("INQUIRY_ACCESS_DENIED",
                    HttpStatus.FORBIDDEN, "문의사항 관리 권한이 없습니다.");
        } else {
            errorResponse = ApiResponse.error("ACCESS_DENIED",
                    HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");
        }

        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}