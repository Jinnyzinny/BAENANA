package com.ssafy.backend.home.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.home.dto.response.HospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MedicineResDto;
import com.ssafy.backend.home.dto.response.RemainDayResDto;
import com.ssafy.backend.home.service.HomeService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    @GetMapping("/remain_day")
    public ResponseEntity<ApiResponse<?>> getRemainDay(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(homeService.getRemainDay(user));
    }

    @GetMapping("/medicine")
    public ResponseEntity<ApiResponse<?>> getMedicine(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(homeService.getMedicine(user));
    }

    @GetMapping("/reservation")
    public ResponseEntity<ApiResponse<?>> getHospitalReservation(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(homeService.getHospitalReservation(user));
    }
}
