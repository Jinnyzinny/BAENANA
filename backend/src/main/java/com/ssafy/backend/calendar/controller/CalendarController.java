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

    @GetMapping("/bearing_period")
    public ResponseEntity<String> getBearingPeriod() {

        return ResponseEntity.ok("bearing period");
    }

    @GetMapping("/menstrual_prediction")
    public ResponseEntity<String> getMenstrualPrediction() {

        return ResponseEntity.ok("menstrual_prediction");
    }
}
