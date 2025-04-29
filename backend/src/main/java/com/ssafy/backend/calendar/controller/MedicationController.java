package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.reqDto.medication.AddMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.medication.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetMedicationResDto;
import com.ssafy.backend.calendar.service.medication.MedicationService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/calendar/medication")
@RequiredArgsConstructor
public class MedicationController {
    private final MedicationService medicationService;

    @PostMapping
    public ResponseEntity<MessageResDto> addMedication(
//            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddMedicationScheduleReqDto request) {
        return ResponseEntity.ok(medicationService.addMedication(request));
    }

    @GetMapping
    public ResponseEntity<GetMedicationResDto> getMedication(){

        return ResponseEntity.ok(medicationService.getMedication());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageResDto> updateMedication(
//            @AuthenticationPrincipal UserDetails UserDetails,
            @RequestBody UpdateMedicationScheduleReqDto request,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(medicationService.updateMedication(request,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResDto> deleteMedication(
//            @AuthenticationPrincipal UserDetails UserDetails,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(medicationService.deleteMedication(id));
    }
}
