package com.ssafy.backend.calendar.service.medication;

import com.ssafy.backend.calendar.dto.reqDto.medication.AddMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.medication.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetMedicationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface MedicationService {
    MessageResDto addMedication(AddMedicationScheduleReqDto request);

    List<GetMedicationResDto> getMedication();

    MessageResDto updateMedication(UpdateMedicationScheduleReqDto request, Long id);

    MessageResDto deleteMedication(Long id);
}
