package com.techit.missionsbb.question.dto;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.question.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuestionDto {
    private Integer id;
    private String subject;
    private String content;
    private LocalDateTime createDate;
    private List<Answer> answerList;

    @Builder
    public QuestionDto(Integer id, String subject, String content, LocalDateTime createDate, List<Answer> answerList) {
        this.id = id;
        this.subject = subject;
        this.content = content;
        this.createDate = createDate;
        this.answerList = answerList;
    }

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
                .id(dto.getId())
                .subject(dto.getSubject())
                .content(dto.getContent())
                .answerList(dto.getAnswerList())
                .build();
    }
}
