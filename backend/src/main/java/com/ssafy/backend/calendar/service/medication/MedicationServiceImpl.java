package com.ssafy.backend.calendar.service.medication;

import com.ssafy.backend.calendar.dto.reqDto.medication.AddMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.reqDto.medication.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.calendar.dto.resDto.GetMedicationResDto;
import com.ssafy.backend.calendar.repository.UserRepository;
import com.ssafy.backend.calendar.repository.medication.MedicationLogRepository;
import com.ssafy.backend.calendar.repository.medication.MedicationRepository;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.MedicationLog;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicationServiceImpl implements MedicationService {
    private final UserRepository userRepository;

    private final MedicationRepository medicationRepository;
    private final MedicationLogRepository medicationLogRepository;

    @Override
    public MessageResDto addMedication(
//            UserDetails userDetails
            AddMedicationScheduleReqDto request) {
        Long userId = 0L;
        Medication medication =
                medicationRepository.findByNameAndUser_UserId(request.getName(), userId).orElseGet(
//                        만약 이전에 복용하지 않았던 약이라면 새로 생성하고 복용했던 약이라면 해당 약품을 찾는다.
                        () -> medicationRepository.save(Medication.builder()
                                .name(request.getName())
//                                사용자가 복용한 약 정보에 없기에 당연히 복용기록도 없을 것
                                .medicationLogList(new ArrayList<>())
//                                약을 저장하려고 하는데 User가 없으면 예외 처리
                                .user(userRepository.findById(userId).orElseThrow())
                                .description(request.getMemo())
                                .build())
                );
        List<MedicationLog> medicationLogList = medication.getMedicationLogList();

        for (int i = 0; i <= ChronoUnit.DAYS.between(request.getStart_date(), request.getEnd_date()); i++) {
            medicationLogList.add(
                    MedicationLog.builder()
                            .date(request.getStart_date().plusDays(i))
//                            .time_taken(request.getTime_taken().)
                            .memo(request.getMemo())
                            .build()
            );
        }
//        JPA의 Dirty Checking으로 값 변환
        medication.setMedicationLogList(medicationLogList);

        return MessageResDto.builder()
                .message("복용할 약 정보가 성공적으로 저장되었습니다.")
                .build();
    }

    @Override
    public GetMedicationResDto getMedication(
//            UserDetails userDetails
    ) {

        return GetMedicationResDto.builder().build();
    }

    @Override
    public MessageResDto updateMedication(UpdateMedicationScheduleReqDto request, Long id) {
        Medication medication =
                medicationRepository.findByMedicationId(id).orElse(null);
        if (medication == null) {
            return MessageResDto.builder()
                    .message("복용할 약 정보를 수정하는데 실패했습니다.")
                    .build();
        }

        BeanUtils.copyProperties(request, medication, NullAwareBeanUtils.class);

        return MessageResDto.builder()
                .message("복용할 약 정보가 성공적으로 수정되었습니다.")
                .build();
    }

    @Override
    public MessageResDto deleteMedication(Long id) {
        medicationRepository.deleteById(id);
        return MessageResDto.builder()
                .message("복용할 약 정보를 삭제하는데 성공했습니다.")
                .build();
    }
}
