package com.techit.missionsbb.answer.dto;

import com.techit.missionsbb.question.domain.Question;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AnswerRequestDto {
    private String content;
    private Question question;
}
