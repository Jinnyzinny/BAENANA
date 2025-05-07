package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.custom.MedicationCustomRepository;
import com.ssafy.backend.report.dto.response.GetAllMedicationResDto;
import com.ssafy.backend.report.dto.response.GetRecentMedicationResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
//        userId를 얻는다
        Long userId = user.getUserId();
//        userId로 
        List<Medication> medicationList =
                medicationCustomRepository.findMedicationByUserId(userId);
//        반환할 현재 복용중인 약품 리스트를 생성한다.
        List<GetRecentMedicationResDto.MedicationInfo> todayMedicine = new ArrayList<>();
//        의약품 기록 리스트를 생성한다.
        List<GetRecentMedicationResDto.MedicationInfo> medicineRecord = new ArrayList<>();
//        의약품 기록을 순회하면서 사용자의 의약품 기록을 추가하면서 이전 기록과
        for (Medication medication : medicationList) {
            medicineRecord.add(
                    GetRecentMedicationResDto.MedicationInfo.builder()
                            .name(medication.getName())
                            .build());
            if (ChronoUnit.DAYS.between(
                    LocalDateTime.now(),
                    medication.getMedicationLogList().get(0).getDate()) > 0) {
                todayMedicine.add(
                        GetRecentMedicationResDto.MedicationInfo.builder()
                                .name(medication.getName())
                                .build());
            }
        }
        return GetRecentMedicationResDto.builder()
                .today_medicine(todayMedicine)
                .medicine_record(medicineRecord)
                .build();
    }

    @Override
    public GetAllMedicationResDto getAllMedication(User user) {
        /*
        * userId를 얻어낸다
        * */
        Long userId = user.getUserId();
        /*
        * 사용자가 복용한 모든 의약품 리스트를 얻는다.
        * */
        List<Medication> medicationList =
                medicationCustomRepository.findMedicationByUserId(userId);

        return GetAllMedicationResDto.builder()
                .medicine_record(
                        medicationList.stream().map(
                                record -> GetAllMedicationResDto.each_medication_record.builder()
                                        .name(record.getName())
//                                                    .memo(record.ge)
                                        .start_date(
                                                record.getMedicationLogList().get(0).getDate().toString())
                                        .end_date(
                                                record.getMedicationLogList().get(record.getMedicationLogList().size()-1)
                                                        .getDate().toString())
//                                        .time_taken()
                                        .build()

                        ).toList()
                )
                .build();
    }

}
