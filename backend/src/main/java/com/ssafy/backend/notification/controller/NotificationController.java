package com.ssafy.backend.notification.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.exception.ForbiddenException;
import com.ssafy.backend.notification.dto.requestDto.NotificationRequestDto;
import com.ssafy.backend.notification.dto.responseDto.NotificationResponseDto;
import com.ssafy.backend.notification.service.NotificationService;
import com.ssafy.backend.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // (공통) 공지사항 목록 조회
    @GetMapping
    public ApiResponse<List<NotificationResponseDto.List>> getAllNotifications() {
        List<NotificationResponseDto.List> notifications = notificationService.getAllNotifications();
        return ApiResponse.success("공지사항 목록이 조회되었습니다.", notifications);
    }

    // (공통) 공지사항 상세 조회
    @GetMapping("/{noticeId}")
    public ApiResponse<NotificationResponseDto.Detail> getNotificationById(@PathVariable Long noticeId) {
        NotificationResponseDto.Detail notification = notificationService.getNotificationById(noticeId);
        return ApiResponse.success("공지사항 상세 정보가 조회되었습니다.", notification);
    }

    //(관리자) 공지사항 작성
    // 실제 인증/인가 구현 전까지는 userId를 파라미터로 받아 사용
    @PostMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<NotificationResponseDto.Create> createNotification(
            @RequestBody NotificationRequestDto.Create request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        NotificationResponseDto.Create response = notificationService.createNotification(request, user.getUserId());
        return ApiResponse.success("공지사항이 등록되었습니다.", HttpStatus.CREATED, response);
    }

    // (관리자) 공지사항 수정
    @PatchMapping("/admin/{noticeId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<NotificationResponseDto.Create> updateNotification(
            @PathVariable Long noticeId,
            @RequestBody NotificationRequestDto.Update request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        NotificationResponseDto.Create response = notificationService.updateNotification(noticeId, request);
        return ApiResponse.success("공지사항이 수정되었습니다.", response);
    }

    //(관리자) 공지사항 삭제
    @DeleteMapping("/admin/{noticeId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<?> deleteNotification(
            @PathVariable Long noticeId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        notificationService.deleteNotification(noticeId);
        return ApiResponse.success("공지사항이 삭제되었습니다.");
    }
}