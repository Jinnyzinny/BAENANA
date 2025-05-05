package com.ssafy.backend.home.service;

import com.ssafy.backend.home.dto.response.HospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MedicineResDto;
import com.ssafy.backend.home.dto.response.RemainDayResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface HomeService {
    RemainDayResDto getRemainDay(User user);
    MedicineResDto getMedicine(User user);
    HospitalReservationResDto getHospitalReservation(User user);
}
