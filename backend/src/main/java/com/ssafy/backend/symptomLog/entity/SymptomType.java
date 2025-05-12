package com.ssafy.backend.symptomLog.entity;

import lombok.Getter;

@Getter
public enum SymptomType {
    HEADACHE("두통"),
    STOMACH("복통"),
    TIRED("피로감");

    private final String description;

    SymptomType(String description) {
        this.description = description;
    }

    public static SymptomType fromDescription(String description) {
        for (SymptomType type : SymptomType.values()) {
            if (type.getDescription().equals(description)) {
                return type;
            }
        }
        throw new IllegalArgumentException("일치하는 증상 Type이 없습니다: " + description);
    }
}
