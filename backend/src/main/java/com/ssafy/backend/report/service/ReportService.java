package com.ssafy.backend.report.service;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.report.dto.response.*;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public interface ReportService {
    ApiResponse<?> getAlarm(User user);
    ApiResponse<?> getSummary(User user);
}
