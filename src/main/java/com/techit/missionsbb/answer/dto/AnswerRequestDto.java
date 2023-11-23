package com.techit.missionsbb.answer.dto;

import com.techit.missionsbb.question.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequestDto {
    private String content;
    private Question question;
}
