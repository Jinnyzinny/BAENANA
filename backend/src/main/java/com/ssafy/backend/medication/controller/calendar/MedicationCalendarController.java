package com.ssafy.backend.medication.controller.calendar;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.service.calendar.MedicationService;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/calendar/medication")
@RequiredArgsConstructor
public class MedicationCalendarController {
    private final MedicationService medicationService;

    /*
     * ===== Calendar에서 쓰이는 사용자의 의약품 복용 CRUD 시작 =====
     * */
    @PostMapping
    public ResponseEntity<ApiResponse<?>> addMedication(
            @AuthenticationPrincipal User user,
            @RequestBody AddMedicationScheduleReqDto request) {
        return ResponseEntity.ok(medicationService.addMedication(user, request));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMedication(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(medicationService.getMedication(user));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateMedication(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateMedicationScheduleReqDto request,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(medicationService.updateMedication(user, request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteMedication(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(medicationService.deleteMedication(user, id));
    }
    /*
     * ===== Calendar에서 쓰이는 사용자의 의약품 복용 CRUD 끝 =====
     * */
}
