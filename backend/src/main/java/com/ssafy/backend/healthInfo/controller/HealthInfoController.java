package com.ssafy.backend.healthInfo.controller;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.healthInfo.dto.CategoryDto;
import com.ssafy.backend.healthInfo.dto.HealthInfoDto;
import com.ssafy.backend.healthInfo.service.HealthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

    @GetMapping("")
    public ApiResponse<Page<HealthInfoDto>> getHealthInfoList(@PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<HealthInfoDto> page = healthInfoService.getHealthInfoPage(pageable);
        return ApiResponse.success("건강 정보 목록 조회에 성공하였습니다.", HttpStatus.OK, page);
    }

}