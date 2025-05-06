package com.ssafy.backend.medication.service.calendar;

import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.response.GetMedicationResDto;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.user.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface MedicationService {
    /*
    * Medication CRUD
    * */
    MessageResDto addMedication(User user, AddMedicationScheduleReqDto request);

    List<GetMedicationResDto> getMedication(User user);

    MessageResDto updateMedication(User user,UpdateMedicationScheduleReqDto request, Long id);

    MessageResDto deleteMedication(User user,Long id);
}
