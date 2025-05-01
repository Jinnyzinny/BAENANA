package com.ssafy.backend.menstrual.service.cycle;

import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.response.GetMenstrualCycleResDto;
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
