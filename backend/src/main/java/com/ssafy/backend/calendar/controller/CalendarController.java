package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.reqDto.hospital.AddHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.reqDto.hospital.UpdateHospitalReservationReqDto;
import com.ssafy.backend.calendar.dto.reqDto.medication.AddMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.medication.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.AddMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetHospitalReservationResDto;
import com.ssafy.backend.calendar.dto.resDto.GetMedicationResDto;
import com.ssafy.backend.calendar.dto.resDto.GetMenstrualCycleResDto;
import com.ssafy.backend.calendar.service.cycle.CycleService;
import com.ssafy.backend.calendar.service.hospital.HospitalReservationService;
import com.ssafy.backend.calendar.service.medication.MedicationService;
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
    private final MedicationService medicationService;
    private final CycleService cycleService;

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

    @PatchMapping("/ob_gyn/{id}")
    public ResponseEntity<MessageResDto> updateHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            @PathVariable Long id,
            @RequestBody UpdateHospitalReservationReqDto request
            ) {
        return ResponseEntity.ok(hospitalReservationService.updateHospitalReservation(request,id));
    }

    @DeleteMapping("/ob_gyn/{id}")
    public ResponseEntity<MessageResDto> deleteHospitalReservation(
//            @AuthenticationPrincipal UserDetails userDetails
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(hospitalReservationService.deleteHospitalReservation(id));
    }

    @PostMapping("/medication")
    public ResponseEntity<MessageResDto> addMedication(
//            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddMedicationScheduleReqDto request) {
        return ResponseEntity.ok(medicationService.addMedication(request));
    }

    @GetMapping("/medication")
    public ResponseEntity<GetMedicationResDto> getMedication(){

        return ResponseEntity.ok(medicationService.getMedication());
    }

    @PatchMapping("/medication/{id}")
    public ResponseEntity<MessageResDto> updateMedication(
//            @AuthenticationPrincipal UserDetails UserDetails,
            @RequestBody UpdateMedicationScheduleReqDto request,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(medicationService.updateMedication(request,id));
    }

    @DeleteMapping("/medication/{id}")
    public ResponseEntity<MessageResDto> deleteMedication(
//            @AuthenticationPrincipal UserDetails UserDetails,
            @PathVariable Long id
    ){
        return ResponseEntity.ok(medicationService.deleteMedication(id));
    }

    @PostMapping("menstrual_cycle")
    public ResponseEntity<MessageResDto> addMenstrualCycle(
            @RequestBody AddMenstrualCycleReqDto request
    ){
        return ResponseEntity.ok(cycleService.addMenstrualCycle(request));
    }

   @GetMapping("menstrual_cycle")
   public ResponseEntity<GetMenstrualCycleResDto> getMenstrualCycle(){
        return ResponseEntity.ok(cycleService.getMenstrualCycle());
   }

    @PatchMapping("menstrual_cycle/{cycle_id}")
    public ResponseEntity<MessageResDto> updateMenstrualCycle(
            @RequestBody UpdateMenstrualCycleReqDto request,
            @PathVariable Long cycle_id
            ){
        return ResponseEntity.ok(cycleService.updateMenstrualCycle(request,cycle_id));
    }
}
