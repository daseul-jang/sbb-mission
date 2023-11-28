package com.techit.missionsbb.question.dto;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.question.domain.Question;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionDto {
    private int id;
    private String subject;
    private String content;
    private LocalDateTime createDate;
    private List<Answer> answerList;

    public QuestionDto(final QuestionRequestDto dto) {
        this.subject = dto.getSubject();
        this.content = dto.getContent();
    }

    public QuestionDto(final Question entity) {
        this.id = entity.getId();
        this.subject = entity.getSubject();
        this.content = entity.getContent();
        this.createDate = entity.getCreateDate();
        this.answerList = entity.getAnswerList();
    }

    public static Question toEntity(final QuestionDto dto) {
        return Question.builder()
                .subject(dto.getSubject())
                .content(dto.getContent())
                .answerList(dto.getAnswerList())
                .build();
    }
}
