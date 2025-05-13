package com.ssafy.backend.medication.service.report;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.custom.MedicationCustomRepository;
import com.ssafy.backend.report.dto.response.GetAllMedicationResDto;
import com.ssafy.backend.report.dto.response.GetRecentMedicationResDto;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
    @Transactional(readOnly = true)
    public ApiResponse<?> getRecentMedication(User user) {
        /*
         *userId를 얻는다
         */
        Long userId = user.getUserId();
        /*
         * userId로 최근 복용한 약을 불러온다.
         */
        List<Medication> medicationList =
                medicationCustomRepository.findMedicationByUserId(userId).orElse(null);

        if(medicationList == null || medicationList.isEmpty()) {
            return ApiResponse.success("사용자가 최근 복용한 약이 없습니다");
        }
        /*
         * 반환할 현재 복용중인 약품 리스트를 생성한다.
         */
        List<GetRecentMedicationResDto.MedicationInfo> todayMedicine = new ArrayList<>();
        /*
         *의약품 기록 리스트를 생성한다.
         */
        List<GetRecentMedicationResDto.MedicationInfo> medicineRecord = new ArrayList<>();
        /*
         * 의약품 기록을 순회하면서 사용자의 의약품 기록을 추가하면서
         * 오늘 이후에도 복용을 한다면 현재 복용중인 의약품리스트에도 추가한다.
         * */
        for (Medication medication : medicationList) {
            medicineRecord.add(
                    GetRecentMedicationResDto.MedicationInfo.builder()
                            .name(medication.getName())
                            .build());
            if (medication.getEndDate().isAfter(LocalDate.now())) {
                todayMedicine.add(
                        GetRecentMedicationResDto.MedicationInfo.builder()
                                .name(medication.getName())
                                .build());
            }
        }
        return ApiResponse.success(
                "현재를 포함한 최근 3개월 간의 복용한 약 정보를 조회합니다.",
                GetRecentMedicationResDto.builder()
                        .today_medicine(todayMedicine)
                        .medicine_record(medicineRecord)
                        .build());
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<?> getAllMedication(User user) {
        /*
         * userId를 얻어낸다
         * */
        Long userId = user.getUserId();
        /*
         * 사용자가 복용한 모든 의약품 리스트를 얻는다.
         * */
        List<Medication> medicationList =
                medicationCustomRepository.findMedicationByUserId(userId).orElse(null);

        if (medicationList == null || medicationList.isEmpty()) {
            return ApiResponse.success("사용자가 복용한 의약품이 없습니다.");
        }

        return ApiResponse.success("사용자가 복용한 모든 의약품 리스트를 얻는다.",
                GetAllMedicationResDto.builder()
                        .medicine_record(
                                medicationList.stream().map(
                                        record -> GetAllMedicationResDto.each_medication_record.builder()
                                                .name(record.getName())

                                                .start_date(
                                                        record.getStartDate().toString())
                                                .end_date(
                                                        record.getEndDate().toString())
                                                .time_taken(record.getTimeTakenList().stream().map(
                                                        t -> t.getTime_taken().toString()
                                                ).toList())
                                                .memo(record.getDescription())
                                                .build()
                                ).toList()
                        )
                        .build());
    }
}