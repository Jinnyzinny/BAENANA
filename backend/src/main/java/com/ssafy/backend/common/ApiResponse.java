package com.ssafy.backend.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    private String code;
    private int status;
    private String message;
    private LocalDateTime timestamp;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .code("SUCCESS")
                .status(HttpStatus.OK.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(String message, HttpStatus status, T data) {
        return ApiResponse.<T>builder()
                .code("SUCCESS")
                .status(status.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
    }

    public static ApiResponse<?> success(String message) {
        return ApiResponse.builder()
                .code("SUCCESS")
                .status(HttpStatus.OK.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static ApiResponse<?> error(String code, HttpStatus status, String message) {
        return ApiResponse.builder()
                .code(code)
                .status(status.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
}