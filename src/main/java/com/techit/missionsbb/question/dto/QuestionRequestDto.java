package com.techit.missionsbb.question.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequestDto {
    @NotNull(message = "제목을 입력해 주세요.")
    private String subject;

    @NotNull(message = "내용을 입력해 주세요.")
    private String content;
}
