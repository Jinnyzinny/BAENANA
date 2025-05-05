package com.ssafy.backend.inquiry.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

public class InquiryRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        @NotBlank(message = "제목은 필수 입력값입니다.")
        @Size(max = 100, message = "제목은 최대 100자까지 입력 가능합니다.")
        private String title;

        @NotBlank(message = "문의 내용은 필수 입력값입니다.")
        private String questionContent;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Update {
        @NotBlank(message = "제목은 필수 입력값입니다.")
        @Size(max = 100, message = "제목은 최대 100자까지 입력 가능합니다.")
        private String title;

        @NotBlank(message = "문의 내용은 필수 입력값입니다.")
        private String questionContent;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnswerCreate {
        @NotBlank(message = "답변 내용은 필수 입력값입니다.")
        private String answerContent;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnswerUpdate {
        @NotBlank(message = "답변 내용은 필수 입력값입니다.")
        private String answerContent;
    }
}