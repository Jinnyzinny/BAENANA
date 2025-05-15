package com.ssafy.backend.menstrual.service.cycle_log;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleDailyLogReqDto;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.menstrual.exception.DuplicateDailyLog;
import com.ssafy.backend.menstrual.exception.MenstrualException;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.MenstrualDailyLogRepository;
import com.ssafy.backend.symptomLog.entity.SymptomLog;
import com.ssafy.backend.symptomLog.entity.SymptomType;
import com.ssafy.backend.symptomLog.repository.SymptomLogRepository;
import com.ssafy.backend.user.entity.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

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
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository
                        .findByStartDateLessThanEqualAndEndDateGreaterThanEqual(request.getDate(), request.getDate())
                        .orElseThrow(() -> new MenstrualException("연관된 생리주기 정보가 없습니다."));

        if (menstrualDailyLogRepository.existsByCycle_User_UserIdAndDate(user.getUserId(), request.getDate())) {
            throw new DuplicateDailyLog("이미 저장된 일자입니다.");
        }
        MenstrualDailyLog dailyLog = menstrualDailyLogRepository.save(
                MenstrualDailyLog.builder()
                        .cycle(
                                menstrualCycleRepository.findById(menstrualCycle.getCycleId()).orElseThrow(
                                        () -> new MenstrualException("주기 정보가 없습니다.")
                                ))
                        .date(request.getDate())
                        .bleedingLevel(request.getBleeding_level())
                        .painLevel(request.getPain_level())
                        .stressLevel(request.getStress_level())
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
                                .symptomType(symptom)
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
                        () -> new MenstrualException("주기 세부 정보가 없습니다.")
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
        if (request.getStress_level() != null) {
            dailyLog.setStressLevel(request.getStress_level());
        }
        if (request.getSymptoms() != null) {
            System.out.println("================진입은 하냐??==============");
            Set<SymptomLog> requestSymptomLog = request.getSymptoms().stream().map(
                    symptom -> SymptomLog.builder()
                            .menstrualDailyLog(dailyLog)
                            .date(request.getDate())
                            .symptomType(symptom)
                            .build()
            ).collect(Collectors.toSet());

            dailyLog.getSymptomLog().clear();
            dailyLog.getSymptomLog().addAll(requestSymptomLog);
        }

        return ApiResponse.success("생리 주기 정보가 성공적으로 변경되었습니다.");
    }
}
