package com.ssafy.backend.faq.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class FaqRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        @NotBlank(message = "질문 내용은 필수 입력값입니다.")
        private String question;

        @NotBlank(message = "답변 내용은 필수 입력값입니다.")
        private String answer;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Update {
        private String question;
        private String answer;
    }
}