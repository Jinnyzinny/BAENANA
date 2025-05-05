package com.ssafy.backend.hospital.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusTypeConverter implements AttributeConverter<StatusType, String> {
    @Override
    public String convertToDatabaseColumn(StatusType attribute) {
        if (attribute == null) return null;
        return attribute.getDescription(); // 한글로 저장
    }

    @Override
    public StatusType convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return StatusType.fromDescription(dbData); // 한글로부터 Enum 복원
    }
}
