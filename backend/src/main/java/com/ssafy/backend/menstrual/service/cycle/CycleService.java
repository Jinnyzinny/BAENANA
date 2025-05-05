package com.ssafy.backend.menstrual.service.cycle;

import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.response.GetMenstrualCycleResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface CycleService {
    MessageResDto addMenstrualCycle(User user, AddMenstrualCycleReqDto request);
    List<GetMenstrualCycleResDto> getMenstrualCycle(User user);
    MessageResDto updateMenstrualCycle(UpdateMenstrualCycleReqDto request,Long cycle_id);
}
