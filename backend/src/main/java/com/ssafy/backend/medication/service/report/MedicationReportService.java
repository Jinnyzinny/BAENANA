package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MedicationReportService {    /*
    /*
    * Report Service
    * */
    /*
     * 사용자의 현재 복용중인 약을 포함한 최근 6개월 복용약을 조회한다.
     * */
    ApiResponse<?> getRecentMedication(User user);

    /*
     * 사용자가 복용한 모든 의약품을 조회한다.
     * */
    ApiResponse<?> getAllMedication(User user);
}
