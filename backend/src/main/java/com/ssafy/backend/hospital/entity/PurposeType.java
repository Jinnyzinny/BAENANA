package com.ssafy.backend.hospital.entity;

import lombok.Getter;

@Getter
public enum PurposeType {
    CHECKUP("정기검진")
    ;

    private final String description;

    PurposeType(String description) {
        this.description = description;
    }
}
