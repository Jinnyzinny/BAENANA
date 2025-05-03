package com.ssafy.backend.hospital.controller;

import com.ssafy.backend.hospital.dto.request.AddHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.request.UpdateHospitalReservationReqDto;
import com.ssafy.backend.hospital.dto.response.GetHospitalReservationResDto;
import com.ssafy.backend.hospital.service.HospitalReservationService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/calendar/ob_gyn")
@RequiredArgsConstructor
public class HospitalReservationController {
    private final HospitalReservationService hospitalReservationService;


    @PostMapping
    public ResponseEntity<MessageResDto> addHospitalReservation(
            @AuthenticationPrincipal User user,
            @RequestBody AddHospitalReservationReqDto request
    ) {
        return ResponseEntity.ok(hospitalReservationService.addHospitalReservation(
                user,
                request));
    }

    @GetMapping
    public ResponseEntity<List<GetHospitalReservationResDto>> getHospitalReservation(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(hospitalReservationService.getHospitalReservation(user));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageResDto> updateHospitalReservation(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @RequestBody UpdateHospitalReservationReqDto request
    ) {
        return ResponseEntity.ok(hospitalReservationService.updateHospitalReservation(user,request,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResDto> deleteHospitalReservation(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(hospitalReservationService.deleteHospitalReservation(user,id));
    }
}
