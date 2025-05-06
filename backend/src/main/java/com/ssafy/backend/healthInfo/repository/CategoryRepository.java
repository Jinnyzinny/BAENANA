package com.ssafy.backend.healthInfo.repository;

import com.ssafy.backend.healthInfo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 이름으로 카테고리 조회 (중복 방지 또는 단건 탐색 시 유용)
    Optional<Category> findByName(String name);

    // 카테고리 존재 여부
    boolean existsByName(String name);
}
