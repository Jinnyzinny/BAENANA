package com.ssafy.backend.user.repository;

import com.ssafy.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 소셜 로그인 사용자 조회
    Optional<User> findBySocialIdAndProvider(String socialId, String provider);
    Optional<User> findById(Long userId);
}