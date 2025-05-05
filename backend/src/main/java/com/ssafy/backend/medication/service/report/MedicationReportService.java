package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.report.dto.response.GetAllMedicationResDto;
import com.ssafy.backend.report.dto.response.GetRecentMedicationResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MedicationReportService {    /*
    /*
    * Report Service
    * */
    GetRecentMedicationResDto getRecentMedication(User user);
    GetAllMedicationResDto getAllMedication(User user);
}
