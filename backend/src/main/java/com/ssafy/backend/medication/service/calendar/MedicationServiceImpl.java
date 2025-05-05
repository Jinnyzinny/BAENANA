package com.ssafy.backend.medication.service.calendar;

import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.response.GetMedicationResDto;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.MedicationLog;
import com.ssafy.backend.medication.repository.MedicationLogRepository;
import com.ssafy.backend.medication.repository.MedicationRepository;
import com.ssafy.backend.medication.repository.custom.MedicationCustomRepository;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicationServiceImpl implements MedicationService {
    private final MedicationRepository medicationRepository;
    private final MedicationLogRepository medicationLogRepository;
    private final MedicationCustomRepository medicationCustomRepository;
    private final UserRepository userRepository;

    @Override
    public MessageResDto addMedication(
            User user,
            AddMedicationScheduleReqDto request) {
//        userId를 알아낸다
        Long userId = user.getUserId();
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
    public List<GetMedicationResDto> getMedication(
            User user
    ) {
        /*
         * userId를 알아낸다.
         */
        Long userId = user.getUserId();
        /*
         * 사용자가 복용하는 의약품 종류를 조회한다.
         * */
        List<Medication> medication =
                medicationRepository.findByUser_UserId(userId).orElseThrow(NoSuchElementException::new);
        /*
         * 해당 종류를 순회하면서 의약품 기록을 가져온다.
         * */
        return medication.stream().map(
                m -> {
                    //의약품 기록 정보를 최신에서 과거 순서로 가져온다.
                    List<MedicationLog> log =
                            medicationLogRepository.findByMedication_MedicationIdOrderByDateDesc(
                                    m.getMedicationId()
                            ).orElseThrow(/*
                             * 약을 받아는 왔는데 복용을 언제까지 하는 정보가 없는 건 불가능
                             */NoSuchElementException::new);

                    return GetMedicationResDto.builder()
                            .medication_id(m.getMedicationId())
                            .start_date(log.get(log.size() - 1).getDate().toString())
                            .end_date(log.get(0).getDate().toString())
//                            .time_taken()
                            .memo(m.getDescription())
                            .build();
                }
        ).toList();
    }

    @Override
    public MessageResDto updateMedication(User user, UpdateMedicationScheduleReqDto request, Long id) {
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
    public MessageResDto deleteMedication(User user, Long id) {
        medicationRepository.deleteById(id);
        return MessageResDto.builder()
                .message("복용할 약 정보를 삭제하는데 성공했습니다.")
                .build();
    }
}
