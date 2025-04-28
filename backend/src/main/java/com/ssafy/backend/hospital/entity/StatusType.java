package com.ssafy.backend.hospital.entity;

import lombok.Getter;

@Getter
public enum StatusType {
    COMPLETE_RESERVATION("예약 완료"),
    COMPLETE_VISIT("방문 완료");


    private final String description;

    StatusType(String description) {
        this.description = description;
    }
}

