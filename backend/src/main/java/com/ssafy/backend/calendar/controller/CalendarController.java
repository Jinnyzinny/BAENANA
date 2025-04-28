package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.reqDto.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetHospitalReservationResDto;
import com.ssafy.backend.calendar.service.hospital.HospitalReservationService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final HospitalReservationService hospitalReservationService;

    @PostMapping("/ob_gyn")
    public ResponseEntity<MessageResDto> addHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            @RequestBody AddHospitalReservationReqDto request
    ) {
        return ResponseEntity.ok(hospitalReservationService.addHospitalReservation(
                //userDetails
                request));
    }

    @GetMapping("/ob_gyn")
    public ResponseEntity<List<GetHospitalReservationResDto>> getHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(hospitalReservationService.getHospitalReservation());
    }

    @PatchMapping("/ob_gyn")
    public ResponseEntity<MessageResDto> updateHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(hospitalReservationService.updateHospitalReservation());
    }

    @DeleteMapping("/ob_gyn")
    public ResponseEntity<MessageResDto> deleteHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(hospitalReservationService.deleteHospitalReservation());
    }
}
