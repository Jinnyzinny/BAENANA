package com.ssafy.backend.home.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface HomeService {
    ApiResponse<?> getRemainDay(User user);

    ApiResponse<?> getMedicine(User user);

    ApiResponse<?> getHospitalReservation(User user);
}
