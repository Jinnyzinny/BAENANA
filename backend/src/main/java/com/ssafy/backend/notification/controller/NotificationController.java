package com.ssafy.backend.notification.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.notification.dto.requestDto.NotificationRequestDto;
import com.ssafy.backend.notification.dto.responseDto.NotificationResponseDto;
import com.ssafy.backend.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public ApiResponse<NotificationResponseDto.Create> createNotification(
            @RequestBody NotificationRequestDto.Create request,
            @RequestParam Long userId) {

        NotificationResponseDto.Create response = notificationService.createNotification(request, userId);
        return ApiResponse.success("공지사항이 등록되었습니다.", HttpStatus.CREATED, response);
    }

    // (관리자) 공지사항 수정
    @PatchMapping("/admin/{noticeId}")
    public ApiResponse<NotificationResponseDto.Create> updateNotification(
            @PathVariable Long noticeId,
            @RequestBody NotificationRequestDto.Update request) {

        NotificationResponseDto.Create response = notificationService.updateNotification(noticeId, request);
        return ApiResponse.success("공지사항이 수정되었습니다.", response);
    }

    //(관리자) 공지사항 삭제
    @DeleteMapping("/admin/{noticeId}")
    public ApiResponse<?> deleteNotification(@PathVariable Long noticeId) {
        notificationService.deleteNotification(noticeId);
        return ApiResponse.success("공지사항이 삭제되었습니다.");
    }
}