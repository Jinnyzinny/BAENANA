package com.ssafy.backend.user.service;


import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void softDeleteUser(User user) {
        User managedUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new RuntimeException("유저 없음"));
        managedUser.setIsDeleted(true);
        managedUser.setDeletedAt(LocalDateTime.now());
        // 굳이 save 안 해도 JPA가 트랜잭션 내에서 dirty checking 처리함
    }

    @Transactional
    public Boolean toggleUserAlarm(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        boolean newValue = !Boolean.TRUE.equals(user.getAllowAlarm());
        user.setAllowAlarm(newValue);
        userRepository.save(user); // 트랜잭션 + save로 확실히 반영
        return newValue;
    }

}