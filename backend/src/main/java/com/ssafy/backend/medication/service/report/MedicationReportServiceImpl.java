package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.custom.MedicationCustomRepository;
import com.ssafy.backend.report.dto.response.GetAllMedicationResDto;
import com.ssafy.backend.report.dto.response.GetRecentMedicationResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicationReportServiceImpl implements MedicationReportService {
    private final MedicationCustomRepository medicationCustomRepository;
    /*
     * ===== Report Domain Medication 정보 제공 =====
     * */
    @Override
    public GetRecentMedicationResDto getRecentMedication(User user) {
        Long userId = user.getUserId();
        List<GetRecentMedicationResDto.MedicationInfo> medicationInfoList = new ArrayList<>();

        List<Medication> medicationList =
                medicationCustomRepository.findMedicationByUserId(userId);

        List<GetRecentMedicationResDto> recentMedicationList = new ArrayList<>();

        List<GetRecentMedicationResDto.MedicationInfo> recentMedicationInfoList
                = new ArrayList<>();

        for (Medication m : medicationList) {
//            복용 약의 전체 약명을 가져온다.
            recentMedicationInfoList.add(
                    GetRecentMedicationResDto.MedicationInfo.builder()
                            .name(m.getName())
                            .build());
        }

        recentMedicationList.add(
                GetRecentMedicationResDto.builder()
                        .today_medicine(null)
                        .medicine_record(null)
                        .build()
        );



        return GetRecentMedicationResDto.builder()
//                .today_medicine()
                .medicine_record(recentMedicationInfoList)
                .build();
    }

    @Override
    public GetAllMedicationResDto getAllMedication(User user) {
        return null;
    }

}
