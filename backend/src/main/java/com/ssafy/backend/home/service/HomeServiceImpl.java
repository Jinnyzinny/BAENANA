package com.ssafy.backend.home.service;

import com.ssafy.backend.home.dto.response.HospitalReservationResDto;
import com.ssafy.backend.home.dto.response.MedicineResDto;
import com.ssafy.backend.home.dto.response.RemainDayResDto;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.hospital.repository.HospitalReservationRepository;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.medication.repository.MedicationRepository;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
    private final HospitalReservationRepository hospitalreservationRepository;
    private final MenstrualCycleRepository menstrualCycleRepository;
    private final MedicationRepository medicationRepository;

    @Override
    public RemainDayResDto getRemainDay() {
        Long userId = 0L;
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId).orElseThrow(
                        () -> new NoSuchElementException("사용자의 주기 정보가 없습니다.")
                );

        return RemainDayResDto.builder()
                .remain_day(RemainDayResDto.Period.builder()
                        .start_date(menstrualCycle.getStartDate().plusDays(28).toString())
                        .end_date(menstrualCycle.getEndDate().plusDays(35).toString())
                        .build())
                .childbearing_period(menstrualCycle.getStartDate().plusDays(9).toString())
                .ovulation_day(menstrualCycle.getStartDate().plusDays(14).toString())
                .PMS(menstrualCycle.getStartDate().plusDays(21).toString())
                .build();
    }

    @Override
    public MedicineResDto getMedicine() {
        Long userId = 0L;
//        Medication medication=medicationRepository.findByUser_UserId(userId).orElse(null);


        return MedicineResDto.builder()
                .medicine(""
//                        String.format(
//                                "%d시에 %s약 복용이 있습니다.",
//                                "",
//                                medication.getName()
//                        )
                )
                .build();
    }

    @Override
    public HospitalReservationResDto getHospitalReservation() {
        Long userId = 0L;
        HospitalReservation hospitalReservation =
                hospitalreservationRepository
//                        엄청 길긴 한데 UserId와 오늘 날짜 이후로 찾은 결과중 첫번째
//                        이걸 가져오면 오늘 이후의 첫번째 당면한 예약 결과를 가져온다.
                        .findFirstByUser_UserIdAndReservationDateAfterOrderByReservationDate(userId, LocalDateTime.now()).orElseThrow();

        LocalDateTime dateTime = hospitalReservation.getReservationDate();

        return HospitalReservationResDto.builder()
                .reservation(
                        String.format(
                                "%d일 %d시에 %s 병원을 방문해야 합니다",
                                dateTime.getDayOfMonth(),
                                dateTime.getHour(),
                                hospitalReservation.getHospitalName()
                        )
                )
                .build();
    }
}
