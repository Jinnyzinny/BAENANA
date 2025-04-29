package com.ssafy.backend.calendar.controller;

import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.AddMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetMenstrualCycleResDto;
import com.ssafy.backend.calendar.service.cycle.CycleService;
import com.ssafy.backend.home.dto.response.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/calendar/menstrual_cycle")
@RequiredArgsConstructor
public class MenstrualCycleController {
    private final CycleService cycleService;

    @PostMapping
    public ResponseEntity<MessageResDto> addMenstrualCycle(
            @RequestBody AddMenstrualCycleReqDto request
    ){
        return ResponseEntity.ok(cycleService.addMenstrualCycle(request));
    }

    @GetMapping
    public ResponseEntity<GetMenstrualCycleResDto> getMenstrualCycle(){
        return ResponseEntity.ok(cycleService.getMenstrualCycle());
    }

    @PatchMapping("/{cycle_id}")
    public ResponseEntity<MessageResDto> updateMenstrualCycle(
            @RequestBody UpdateMenstrualCycleReqDto request,
            @PathVariable Long cycle_id
    ){
        return ResponseEntity.ok(cycleService.updateMenstrualCycle(request,cycle_id));
    }
}
