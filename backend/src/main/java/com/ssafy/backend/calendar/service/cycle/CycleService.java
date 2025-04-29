package com.ssafy.backend.calendar.service.cycle;

import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.AddMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.menstrual_cycle.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetMenstrualCycleResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CycleService {
    MessageResDto addMenstrualCycle(AddMenstrualCycleReqDto request);
    GetMenstrualCycleResDto getMenstrualCycle();
    MessageResDto updateMenstrualCycle(UpdateMenstrualCycleReqDto request,Long cycle_id);
}
