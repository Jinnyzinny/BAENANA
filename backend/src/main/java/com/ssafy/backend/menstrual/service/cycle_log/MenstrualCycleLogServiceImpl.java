package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.exception.MenstrualException;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.symptom.entity.SymptomLog;
import com.ssafy.backend.symptom.entity.SymptomType;
import com.ssafy.backend.symptom.repository.SymptomLogRepository;
import com.ssafy.backend.user.entity.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MenstrualCycleLogServiceImpl implements MenstrualCycleLogService {
    private final EntityManager em;
    private final MenstrualDailyLogRepository menstrualDailyLogRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final SymptomLogRepository symptomLogRepository;

    @Override
    public ApiResponse<?> addMenstrualCycleDailyLog(User user, AddMenstrualCycleDailyLogReqDto request) {
        MenstrualDailyLog dailyLog = menstrualDailyLogRepository.save(
                MenstrualDailyLog.builder()
                        .cycle(
                                menstrualCycleRepository.findById(request.getCycle_id()).orElseThrow(
                                        () -> new IllegalArgumentException("주기 정보가 없습니다.")
                                ))
                        .date(request.getDate())
                        .bleedingLevel(request.getBleeding_level())
                        .painLevel(request.getPain_level())
                        .isStart(request.getIs_start())
                        .isEnd(request.getIs_end())
                        .build()
        );
        em.flush();
        symptomLogRepository.saveAll(
                request.getSymptom().stream().map(
                        symptom -> SymptomLog.builder()
                                .menstrualDailyLog(dailyLog)
                                .date(request.getDate())
                                .symptomType(SymptomType.fromDescription(symptom))
                                .severity(0)
                                .memo("")
                                .build()
                ).toList()
        );
        return ApiResponse.success("생리 주기 세부정보가 성공적으로 저장되었습니다.");
    }

    @Override
    public ApiResponse<?> updateMenstrualCycleDailyLog(User user, UpdateMenstrualCycleDailyLogReqDto request, Long id) {
        MenstrualDailyLog dailyLog =
                menstrualDailyLogRepository.findById(id).orElseThrow(
                        ()-> new MenstrualException("주기 세부 정보가 없습니다.")
                );

        BeanUtils.copyProperties(request, dailyLog, NullAwareBeanUtils.getNullPropertyNames(request));
        if (request.getDate() != null) {
            dailyLog.setDate(request.getDate());
        }
        if (request.getBleeding_level() != null) {
            dailyLog.setBleedingLevel(request.getBleeding_level());
        }
        if (request.getPain_level() != null) {
            dailyLog.setPainLevel(request.getPain_level());
        }

        return ApiResponse.success("생리 주기 정보가 성공적으로 변경되었습니다.");
    }
}
