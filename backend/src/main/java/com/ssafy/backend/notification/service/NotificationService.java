package com.ssafy.backend.notification.service;

import com.ssafy.backend.notification.exception.NotificationNotFoundException;
import com.ssafy.backend.notification.entity.Notification;
import com.ssafy.backend.notification.dto.requestDto.NotificationRequestDto;
import com.ssafy.backend.notification.dto.responseDto.NotificationResponseDto;
import com.ssafy.backend.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    /**
     * 공지사항 목록을 조회합니다.
     * @return 공지사항 목록
     */
    @Transactional(readOnly = true)
    public List<NotificationResponseDto.List> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAllByOrderByCreatedAtDesc();
        return NotificationResponseDto.List.fromEntities(notifications);
    }

    /**
     * 공지사항 상세 정보를 조회합니다.
     * @param notificationId 공지사항 ID
     * @return 공지사항 상세 정보
     */
    @Transactional(readOnly = true)
    public NotificationResponseDto.Detail getNotificationById(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException("존재하지 않는 공지사항입니다."));

        return NotificationResponseDto.Detail.fromEntity(notification);
    }

    /**
     * 새로운 공지사항을 생성합니다.
     * @param request 공지사항 생성 요청 DTO
     * @param userId 생성자 ID
     * @return 생성된 공지사항 ID
     */
    @Transactional
    public NotificationResponseDto.Create createNotification(NotificationRequestDto.Create request, Long userId) {
        Notification notification = Notification.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .createdBy(userId)
                .build();

        Notification savedNotification = notificationRepository.save(notification);

        return NotificationResponseDto.Create.builder()
                .notificationId(savedNotification.getNotificationId())
                .build();
    }

    /**
     * 공지사항을 수정합니다.
     * @param notificationId 수정할 공지사항 ID
     * @param request 공지사항 수정 요청 DTO
     * @return 수정된 공지사항 ID
     */
    @Transactional
    public NotificationResponseDto.Create updateNotification(Long notificationId, NotificationRequestDto.Update request) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException("수정할 공지사항이 존재하지 않습니다."));

        notification.update(request.getTitle(), request.getContent());

        return NotificationResponseDto.Create.builder()
                .notificationId(notification.getNotificationId())
                .build();
    }

    /**
     * 공지사항을 삭제합니다.
     * @param notificationId 삭제할 공지사항 ID
     */
    @Transactional
    public void deleteNotification(Long notificationId) {
        if (!notificationRepository.existsById(notificationId)) {
            throw new NotificationNotFoundException("삭제할 공지사항이 존재하지 않습니다.");
        }

        notificationRepository.deleteById(notificationId);
    }
}