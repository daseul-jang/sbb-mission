package com.techit.missionsbb.question.dto;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.user.domain.User;
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
    private User author;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private List<Answer> answerList;

    public QuestionDto(final QuestionRequestDto dto, User user) {
        this.subject = dto.getSubject();
        this.author = user;
        this.content = dto.getContent();
    }

    public QuestionDto(final Question entity) {
        this.id = entity.getId();
        this.subject = entity.getSubject();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
        this.createDate = entity.getCreateDate();
        this.updateDate = entity.getUpdateDate();
        this.answerList = entity.getAnswerList();
    }

    public static Question toEntity(final QuestionDto dto) {
        return Question.builder()
                .subject(dto.getSubject())
                .author(dto.getAuthor())
                .content(dto.getContent())
                .createDate(dto.getCreateDate())
                .updateDate(dto.getUpdateDate())
                .answerList(dto.getAnswerList())
                .build();
    }
}
