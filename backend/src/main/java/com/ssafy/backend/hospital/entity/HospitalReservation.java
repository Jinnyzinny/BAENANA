package com.ssafy.backend.hospital.entity;

import com.ssafy.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /*
     * =====Column=====
     * */
    private String hospitalName;
    private LocalDateTime reservationDate;
    /*
     * 산부인과
     * 정기검진
     * */
//    @Convert(converter = PurposeTypeConverter.class)
//    private PurposeType purpose;
//    // 사용자가 선택한 한글 문자열로 Enum을 설정하는 메서드
//    public void setPurposeTypeByDescription(String description) {
//        this.purpose = PurposeType.fromDescription(description);
//    }
    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }
    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    private String purpose;

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
    /*
     * 예약됨
     * 완료됨
     * */
    @Convert(converter = StatusTypeConverter.class)
    private StatusType status;

    public void setStatusTypeByDescription(String description) {
        this.status = StatusType.fromDescription(description);
    }
}
