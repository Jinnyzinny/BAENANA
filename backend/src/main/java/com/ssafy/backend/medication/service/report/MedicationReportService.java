package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.report.dto.response.GetAllMedicationResDto;
import com.ssafy.backend.report.dto.response.GetRecentMedicationResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface MedicationReportService {    /*
    /*
    * Report Service
    * */
    GetRecentMedicationResDto getRecentMedication();
    GetAllMedicationResDto getAllMedication();
}
