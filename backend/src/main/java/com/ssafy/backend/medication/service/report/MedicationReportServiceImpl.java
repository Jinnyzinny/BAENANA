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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
                medicationCustomRepository.findThreeMonthMedicationByUserId(userId).orElse(null);

        if (medicationList == null || medicationList.isEmpty()) {
            return ApiResponse.success("사용자가 최근 복용한 약이 없습니다");
        }
        /*
         * 반환할 현재 복용중인 약품 리스트를 생성한다.
         */
        Set<GetRecentMedicationResDto.MedicationInfo> todayMedicine = new HashSet<>();
        /*
         *의약품 기록 리스트를 생성한다.
         */
        List<GetRecentMedicationResDto.MedicationInfo> medicineRecord = new ArrayList<>();
        /*
         * 의약품 기록을 순회하면서 사용자의 의약품 기록을 추가하면서
         * 오늘 이후에도 복용을 한다면 현재 복용중인 의약품리스트에도 추가한다.
         * */
        for (Medication medication : medicationList) {
            if (medication.getEndDate().isBefore(LocalDate.now())) {
                medicineRecord.add(
                        GetRecentMedicationResDto.MedicationInfo.builder()
                                .name(medication.getName())
                                .build());
            }
            if (medication.getEndDate().isAfter(LocalDate.now().minusDays(1))) {
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
            return ApiResponse.success("사용자가 복용한 의약품 전체 기록이 없습니다.");
        }

        Set<GetAllMedicationResDto.each_medication_record> todayMedicine = new HashSet<>();
        List<GetAllMedicationResDto.each_medication_record> medicineRecord = new ArrayList<>();

        for (Medication medication : medicationList) {
            if (medication.getEndDate().isBefore(LocalDate.now())) {
                medicineRecord.add(
                        GetAllMedicationResDto.each_medication_record.builder()
                                .name(medication.getName())
                                .time_taken(medication.getTimeTakenList().stream().map(
                                        timeTaken -> timeTaken.getTime_taken().toString()
                                ).toList())
                                .start_date(medication.getStartDate().toString())
                                .end_date(medication.getEndDate().toString())
                                .build()
                );
            }
            if (medication.getEndDate().isAfter(LocalDate.now().minusDays(1))) {
                todayMedicine.add(
                        GetAllMedicationResDto.each_medication_record.builder()
                                .name(medication.getName())
                                .time_taken(medication.getTimeTakenList().stream().map(
                                        timeTaken -> timeTaken.getTime_taken().toString()
                                ).toList())
                                .start_date(medication.getStartDate().toString())
                                .end_date(medication.getEndDate().toString())
                                .build()
                );
            }
        }

        return ApiResponse.success("사용자가 복용한 모든 의약품 리스트를 얻는다.",
                GetAllMedicationResDto.builder()
                        .today_medicine(todayMedicine)
                        .medicine_record(medicineRecord)
                        .build());
    }
}