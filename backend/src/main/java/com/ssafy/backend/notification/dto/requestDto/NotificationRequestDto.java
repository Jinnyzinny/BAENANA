package com.ssafy.backend.notification.dto.requestDto;

import lombok.*;

public class NotificationRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private String title;
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Update {
        private String title;
        private String content;
    }
}