package com.ssafy.backend.symptom.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SymptomTypeConverter  implements AttributeConverter<SymptomType, String> {
    @Override
    public String convertToDatabaseColumn(SymptomType attribute) {
        if (attribute == null) return null;
        return attribute.getDescription(); // 한글로 저장
    }

    @Override
    public SymptomType convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return SymptomType.fromDescription(dbData); // 한글로부터 Enum 복원
    }
}
