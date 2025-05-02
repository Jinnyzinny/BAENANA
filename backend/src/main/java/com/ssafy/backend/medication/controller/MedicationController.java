package com.ssafy.backend.medication.controller;

import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.response.GetMedicationResDto;
import com.ssafy.backend.medication.service.MedicationService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<GetMedicationResDto>> getMedication(){
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
