package com.ssafy.backend.healthInfo.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.healthInfo.dto.CategoryDto;
import com.ssafy.backend.healthInfo.service.HealthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-info")
@RequiredArgsConstructor
public class HealthInfoController {

    private final HealthInfoService healthInfoService;

    @GetMapping("/categories")
    public ApiResponse<List<CategoryDto>> getCategories() {
        return ApiResponse.success("카테고리 목록 조회에 성공하였습니다.", HttpStatus.OK, healthInfoService.getAllCategories());
    }
}