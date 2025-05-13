package com.ssafy.backend.hospital.entity;

import lombok.Getter;

@Getter
public enum PurposeType {
    CHECKUP("정기검진"),
    ULTRASOUND("초음파"),
    OVULATION_CHECK("배란확인"),
    COUNSELING("상담"),
    ETC("기타(사용자 입력)");

    private final String description;

    PurposeType(String description) {
        this.description = description;
    }

    public static PurposeType fromDescription(String description) {
        for (PurposeType type : PurposeType.values()) {
            if (type.getDescription().equals(description)) {
                return type;
            }
        }
        throw new IllegalArgumentException("일치하는 PurposeType이 없습니다: " + description);
    }
}
