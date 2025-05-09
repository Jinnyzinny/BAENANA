package com.ssafy.backend.notification.dto.responseDto;

import com.ssafy.backend.notification.entity.Notification;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class NotificationResponseDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private Long notificationId;
        private String title;
        private String content;
        private LocalDateTime createdAt;

        public static Detail fromEntity(Notification notification) {
            return Detail.builder()
                    .notificationId(notification.getNotificationId())
                    .title(notification.getTitle())
                    .content(notification.getContent())
                    .createdAt(notification.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class List {
        private Long notificationId;
        private String title;
        private LocalDateTime createdAt;

        public static List fromEntity(Notification notification) {
            return List.builder()
                    .notificationId(notification.getNotificationId())
                    .title(notification.getTitle())
                    .createdAt(notification.getCreatedAt())
                    .build();
        }

        public static java.util.List<List> fromEntities(java.util.List<Notification> notifications) {
            return notifications.stream()
                    .map(List::fromEntity)
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private Long notificationId;
    }
}