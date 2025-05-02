package com.ssafy.backend.medication.service.calendar;

import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.response.GetMedicationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface MedicationService {
    /*
    * Medication CRUD
    * */
    MessageResDto addMedication(AddMedicationScheduleReqDto request);

    List<GetMedicationResDto> getMedication();

    MessageResDto updateMedication(UpdateMedicationScheduleReqDto request, Long id);

    MessageResDto deleteMedication(Long id);
}
