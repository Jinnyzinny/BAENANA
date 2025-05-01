package com.ssafy.backend.medication.service;

import com.ssafy.backend.medication.dto.reqDto.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.reqDto.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.resDto.GetMedicationResDto;
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
