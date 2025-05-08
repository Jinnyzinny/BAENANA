package com.ssafy.backend.healthInfo.repository;

import com.ssafy.backend.healthInfo.entity.HealthInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HealthInfoRepository extends JpaRepository<HealthInfo, Long> {

    // N+1 방지를 위한 Fetch Join 메서드
    @Query("SELECT h FROM HealthInfo h JOIN FETCH h.category WHERE h.category.id = :categoryId")
    List<HealthInfo> findByCategoryWithJoinFetch(@Param("categoryId") Long categoryId);

    // 단건 상세 조회 (Fetch Join 포함)
    @Query("SELECT h FROM HealthInfo h JOIN FETCH h.category WHERE h.id = :id")
    HealthInfo findDetailById(@Param("id") Long id);

    Page<HealthInfo> findByCategoryId(Long categoryId, Pageable pageable);

}
