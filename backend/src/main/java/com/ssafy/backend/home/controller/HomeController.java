package com.ssafy.backend.home.controller;

import com.ssafy.backend.home.dto.response.HospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MedicineResDto;
import com.ssafy.backend.home.dto.response.RemainDayResDto;
import com.ssafy.backend.home.service.HomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<RemainDayResDto> getRemainDay(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(homeService.getRemainDay());
    }

    @GetMapping("/alarm/medicine")
    public ResponseEntity<MedicineResDto> getMedicine(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(homeService.getMedicine());
    }

    @GetMapping("/alarm/reservation")
    public ResponseEntity<HospitalReservationResDto> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(homeService.getHospitalReservation());
    }
}
