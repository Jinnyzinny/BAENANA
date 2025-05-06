package com.ssafy.backend.healthInfo.controller;

import com.ssafy.backend.healthInfo.dto.CategoryDto;
import com.ssafy.backend.healthInfo.service.HealthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-info")
@RequiredArgsConstructor
public class HealthInfoController {

    private final HealthInfoService healthInfoService;

    @GetMapping("/categories")
    public List<CategoryDto> getCategories() {
        return healthInfoService.getAllCategories();
    }
}