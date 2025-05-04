package com.ssafy.backend.notification.repository;

import com.ssafy.backend.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // 최신순으로 공지사항 목록 조회
    List<Notification> findAllByOrderByCreatedAtDesc();
}