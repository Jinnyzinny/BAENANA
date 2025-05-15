package com.ssafy.backend.menstrual.service.cycle;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.response.GetMenstrualCycleResDto;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.exception.MenstrualException;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.menstrual.repository.custom.MenstrualCycleCustomRepository;
import com.ssafy.backend.symptomLog.entity.SymptomLog;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class CycleServiceImpl implements CycleService {
    private final UserRepository userRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MenstrualCycleCustomRepository menstrualCycleCustomRepository;

    @Override
    public ApiResponse<?> addMenstrualCycle(
            User user,
            AddMenstrualCycleReqDto request
    ) {
        /*
         * 생리 주기 기록 추가
         * */
        menstrualCycleRepository.save(
                MenstrualCycle.builder()
                        .user(userRepository.findById(user.getUserId()).orElseThrow(
                                () -> new NoSuchElementException("해당 회원이 존재하지 않습니다.")
                        ))
                        .startDate(request.getStart_date())
                        .endDate(request.getEnd_date())
                        .build()
        );
        return ApiResponse.success("생리 주기 정보가 성공적으로 저장되었습니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getMenstrualCycle(
            User user
    ) {
        List<MenstrualCycle> menstrualCycleList = menstrualCycleCustomRepository.findMenstrualCycleByUser(user);

        if (menstrualCycleList == null || menstrualCycleList.isEmpty()) {
            return ApiResponse.success("사용자의 생리주기 정보가 없습니다.");
        }

        return ApiResponse.success(
                "사용자의 주기 데이터입니다.",
                menstrualCycleList.stream().map(
                        cycle ->
                                GetMenstrualCycleResDto.builder()
                                        .cycle_id(cycle.getCycleId())
                                        .start_date(cycle.getStartDate().toString())
                                        .end_date(cycle.getEndDate().toString())
                                        .detail(
                                                cycle.getLogs().stream().map(
                                                                log ->
                                                                        GetMenstrualCycleResDto.SymptomDailyDetail.builder()
                                                                                .daily_log_id(log.getDailyId())
                                                                                .date(log.getDate().toString())
                                                                                .bleeding_level(log.getBleedingLevel())
                                                                                .pain_level(log.getPainLevel())
                                                                                .stress_level(log.getStressLevel())
                                                                                .symptoms(
                                                                                        log.getSymptomLog().stream().map(
                                                                                                SymptomLog::getSymptomType
                                                                                        ).toList()
                                                                                ).build())
                                                        .toList()
                                        ).build()
                ).toList());
    }

    @Override
    public ApiResponse<?> getMonthlyMenstrualCycle(User user, int year, int month) {
        List<MenstrualCycle> menstrualCycleList
                = menstrualCycleCustomRepository.findMonthlyCycle(
                user.getUserId(),
                year,
                month
        ).orElse(null);

        if (menstrualCycleList == null) {
            return ApiResponse.success("해당 월에는 주기 정보가 존재하지 않습니다.");
        }
        
        return ApiResponse.success(
                "월별 생리 주기 정보를 열람한다.",
                menstrualCycleList.stream().distinct().map(
                                cycle ->
                                        GetMenstrualCycleResDto.builder()
                                                .cycle_id(cycle.getCycleId())
                                                .start_date(cycle.getStartDate().toString())
                                                .end_date(cycle.getEndDate().toString())
//                                                .detail(
//                                                        cycle.getLogs().stream().distinct().map(
//                                                                log ->
//                                                                        GetMenstrualCycleResDto.SymptomDailyDetail.builder()
//                                                                                .daily_log_id(log.getDailyId())
//                                                                                .date(log.getDate().toString())
//                                                                                .bleeding_level(log.getBleedingLevel())
//                                                                                .pain_level(log.getPainLevel())
//                                                                                .stress_level(log.getStressLevel())
//                                                                                .symptoms(
//                                                                                        log.getSymptomLog().stream().distinct().map(
//                                                                                                SymptomLog::getSymptomType
//                                                                                        ).toList()
//                                                                                )
//
//                                                                                .build()
//                                                        ).toList()
//                                                )
                                                .build()
                        )
                        .toList()
        );
    }

    @Override
    public ApiResponse<?> updateMenstrualCycle(
            UpdateMenstrualCycleReqDto request,
            Long cycleId
    ) {
        MenstrualCycle cycle = menstrualCycleRepository.findById(cycleId)
                .orElseThrow(
                        () ->
                                new MenstrualException("생리 주기의 수정하려는 정보가 없습니다"));

        BeanUtils.copyProperties(request, cycle, NullAwareBeanUtils.getNullPropertyNames(request));
        if (request.getStart_date() != null) {
            cycle.setStartDate(request.getStart_date());
        }
        if (request.getEnd_date() != null) {
            cycle.setEndDate(request.getEnd_date());
        }
        return ApiResponse.success("생리 주기 정보가 성공적으로 수정되었습니다.");
    }
}
