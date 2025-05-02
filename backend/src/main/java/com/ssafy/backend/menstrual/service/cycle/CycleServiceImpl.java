package com.ssafy.backend.menstrual.service.cycle;

import com.ssafy.backend.menstrual.dto.request.AddMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.request.UpdateMenstrualCycleReqDto;
import com.ssafy.backend.menstrual.dto.response.GetMenstrualCycleResDto;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.common.utils.NullAwareBeanUtils;
import com.ssafy.backend.home.dto.response.MessageResDto;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CycleServiceImpl implements CycleService {
    private final MenstrualCycleRepository menstrualCycleRepository;

    @Override
    public MessageResDto addMenstrualCycle(
//            UserDetails userDetails
            AddMenstrualCycleReqDto request
    ) {
        menstrualCycleRepository.save(
                MenstrualCycle.builder()
                        .startDate(request.getStart_date())
                        .endDate(request.getEnd_date())
                        .build()
        );
        return MessageResDto.builder()
                .message("생리 주기 정보가 성공적으로 저장되었습니다.")
                .build();
    }

    @Override
    public GetMenstrualCycleResDto getMenstrualCycle() {
        return GetMenstrualCycleResDto.builder()


                .build();
    }

    @Override
    public MessageResDto updateMenstrualCycle(
            UpdateMenstrualCycleReqDto request,
            Long cycleId
    ) {
        MenstrualCycle cycle = menstrualCycleRepository.findById(cycleId).orElse(null);
        if (cycle == null)
            return MessageResDto.builder()
                    .message("생리 주기의 수정이 실패했습니다.")
                    .build();

        BeanUtils.copyProperties(request, cycle, NullAwareBeanUtils.class);

        return MessageResDto.builder()
                .message("생리 주기 정보가 성공적으로 수정되었습니다.")
                .build();
    }
}
