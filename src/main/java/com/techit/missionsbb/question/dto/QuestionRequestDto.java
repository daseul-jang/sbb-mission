package com.techit.missionsbb.question.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionRequestDto {
    @NotBlank(message = "제목을 입력해 주세요.")
    private String subject;

    @NotBlank(message = "내용을 입력해 주세요.")
    private String content;
}
