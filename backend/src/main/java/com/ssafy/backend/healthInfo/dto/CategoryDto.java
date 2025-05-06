package com.ssafy.backend.healthInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
}