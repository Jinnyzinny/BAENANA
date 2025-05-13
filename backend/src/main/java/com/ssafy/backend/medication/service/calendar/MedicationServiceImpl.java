package com.ssafy.backend.medication.service.calendar;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.medication.dto.request.AddMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.request.UpdateMedicationScheduleReqDto;
import com.ssafy.backend.medication.dto.response.GetMedicationResDto;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.entity.TimeTaken;
import com.ssafy.backend.medication.exception.MedicationException;
import com.ssafy.backend.medication.repository.MedicationRepository;
import com.ssafy.backend.medication.repository.TimeTakenRepository;
import com.ssafy.backend.medication.repository.custom.MedicationCustomRepository;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicationServiceImpl implements MedicationService {
    private final EntityManager em;
    private final MedicationRepository medicationRepository;
    private final MedicationCustomRepository medicationCustomRepository;
    private final UserRepository userRepository;
    private final TimeTakenRepository timeTakenRepository;

    @Override
    public ApiResponse<?> addMedication(
            User user,
            AddMedicationScheduleReqDto request) {
        /*
         * userId를 알아낸다
         * */
        Long userId = user.getUserId();
        /*
         * 약품 이름과 userId로 복용한 약품 리스트를 찾는다.
         * */
        Medication medication = medicationRepository.save(
                Medication.builder()
                        .user(userRepository.findById(userId).orElseThrow())
                        .name(request.getName())
                        .startDate(request.getStart_date())
                        .endDate(request.getEnd_date())
                        .description(request.getMemo())
                        .build()
        );
        em.flush();
        timeTakenRepository.saveAll(
                request.getTime_taken().stream().map(
                        time -> TimeTaken.builder()
                                .medication(medication)
                                .time_taken(time)
                                .build()
                ).toList());

//        JPA의 Dirty Checking으로 값 변환
        return ApiResponse.success("복용할 약 정보가 성공적으로 저장되었습니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getMedication(
            User user,
            int year,
            int month
    ) {
        /*
         * userId를 알아낸다.
         */
        Long userId = user.getUserId();
        /*
         * 사용자가 복용하는 의약품 종류를 조회한다.
         * */
        List<Medication> medication =
                medicationCustomRepository.findThisMonthMedicationByUserId(userId,year,month).orElse(null);

        if (medication == null || medication.isEmpty()) {
            return ApiResponse.success("사용자가 복용한 의약품이 없습니다.");
        }
        /*
         * 해당 종류를 순회하면서 의약품 기록을 return한다.
         * */
        return ApiResponse.success(
                "사용자가 복용한 의약품 리스트입니다.",
                medication.stream().map(
                        m -> {
                            //의약품 기록 정보를 최신에서 과거 순서로 가져온다.
                            return GetMedicationResDto.builder()
                                    .medication_id(m.getMedicationId())
                                    .name(m.getName())
                                    .start_date(m.getStartDate().toString())
                                    .end_date(m.getEndDate().toString())
                                    .time_taken(
                                            m.getTimeTakenList().stream().map(
                                                    timeTaken ->
                                                            timeTaken.getTime_taken().toString()
                                            ).toList()
                                    )
                                    .memo(m.getDescription())
                                    .build();
                        }
                ).toList()
        );
    }

    @Override
    public ApiResponse<?> updateMedication(User user, UpdateMedicationScheduleReqDto request, Long id) {
        Medication medication =
                medicationRepository.findByMedicationId(id).orElseThrow(
                        () ->
                                new MedicationException("복용할 약 정보가 존재하지 않습니다."));
        BeanUtils.copyProperties(request, medication, NullAwareBeanUtils.getNullPropertyNames(request));
        if (request.getEnd_date() != null) {
            medication.setEndDate(request.getEnd_date());
        }
        if (request.getStart_date() != null) {
            medication.setStartDate(request.getStart_date());
        }
        if (request.getMemo() != null) {
            medication.setDescription(request.getMemo());
        }
        return ApiResponse.success("복용할 약 정보가 성공적으로 수정되었습니다.");
    }

    @Override
    public ApiResponse<?> deleteMedication(User user, Long id) {
        Medication medication = medicationRepository.findById(id).orElseThrow(
                () ->
                        new MedicationException("삭제할 약 정보가 존재하지 않습니다."));
        medicationRepository.deleteById(medication.getMedicationId());
        return ApiResponse.success("복용할 약 정보를 삭제하는데 성공했습니다.");
    }
}
