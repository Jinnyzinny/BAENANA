package com.ssafy.backend.menstrual.service.report;

import com.ssafy.backend.report.dto.response.GetAllMenstrualResDto;
import com.ssafy.backend.report.dto.response.GetMenstrualInfoResDto;
import com.ssafy.backend.report.dto.response.GetOvulationTestResDto;
import com.ssafy.backend.report.dto.response.GetRecentMenstrualResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MenstrualService {
    GetMenstrualInfoResDto getMenstrualInfo(User user);
    GetOvulationTestResDto getOvulationTest(User user);
    GetRecentMenstrualResDto getRecentMenstrual(User user);
    GetAllMenstrualResDto getAllMenstrual(User user);
}
