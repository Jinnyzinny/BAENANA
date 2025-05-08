package com.ssafy.backend.healthInfo.service;

import com.ssafy.backend.healthInfo.dto.CategoryDto;
import com.ssafy.backend.healthInfo.dto.HealthInfoDto;
import com.ssafy.backend.healthInfo.entity.Category;
import com.ssafy.backend.healthInfo.entity.HealthInfo;
import com.ssafy.backend.healthInfo.repository.CategoryRepository;
import com.ssafy.backend.healthInfo.repository.HealthInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HealthInfoService {

    private final CategoryRepository categoryRepository;
    private final HealthInfoRepository healthInfoRepository;

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(c -> new CategoryDto(c.getId(), c.getName(), c.getDescription()))
                .collect(Collectors.toList());
    }

    public Page<HealthInfoDto> getHealthInfoPage(Pageable pageable) {
        return healthInfoRepository.findAll(pageable)
                .map(healthInfo -> new HealthInfoDto(
                        healthInfo.getId(),
                        healthInfo.getTitle(),
                        healthInfo.getContent(),
                        healthInfo.getImageUrl(),
                        healthInfo.getCreatedAt()
                ));
    }

    public Page<HealthInfoDto> getHealthInfoByCategory(Long categoryId, Pageable pageable) {
        return healthInfoRepository.findByCategoryId(categoryId, pageable)
                .map(info -> new HealthInfoDto(
                        info.getId(),
                        info.getTitle(),
                        info.getContent(),
                        info.getImageUrl(),
                        info.getCreatedAt()
                ));
    }

}