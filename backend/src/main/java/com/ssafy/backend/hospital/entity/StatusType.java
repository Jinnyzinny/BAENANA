package com.ssafy.backend.hospital.entity;

import lombok.Getter;

@Getter
public enum StatusType {
    COMPLETE_RESERVATION("예약됨"),
    COMPLETE_VISIT("완료됨");

    private final String description;

    StatusType(String description) {
        this.description = description;
    }

    public static StatusType fromDescription(String description) {
        for (StatusType type : StatusType.values()) {
            if (type.getDescription().equals(description)) {
                return type;
            }
        }
        throw new IllegalArgumentException("일치하는 상태 값이 없습니다: " + description);
    }
}

