package com.techit.missionsbb.question.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Optional;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionRequestDto {
    @NotNull(message = "제목을 입력해 주세요.")
    private String subject;

    @NotNull(message = "내용을 입력해 주세요.")
    private String content;
}
