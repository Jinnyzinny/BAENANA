package com.ssafy.backend.user.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @DeleteMapping("/me")
    public ApiResponse<Void> deleteCurrentUser(@AuthenticationPrincipal User user) {
        userService.softDeleteUser(user);
        return ApiResponse.success("회원 탈퇴가 완료되었습니다.", HttpStatus.OK, null);
    }

    @PatchMapping("/me/alarm")
    public ApiResponse<Boolean> toggleAlarm(@AuthenticationPrincipal User user) {
        Boolean updatedValue = userService.toggleUserAlarm(user.getUserId());
        return ApiResponse.success("알림 설정이 변경되었습니다.", HttpStatus.OK, updatedValue);
    }

}