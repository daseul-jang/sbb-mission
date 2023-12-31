package com.techit.missionsbb.answer.dto;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.user.domain.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AnswerDto {
    private int id;
    private User author;
    private String content;
    private Question question;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public AnswerDto(final AnswerRequestDto dto, User user) {
        this.author = user;
        this.content = dto.getContent();
        this.question = dto.getQuestion();
    }

    public AnswerDto(final Answer entity) {
        this.id = entity.getId();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
        this.question = entity.getQuestion();
        this.createDate = entity.getCreateDate();
        this.updateDate = entity.getUpdateDate();
    }

    public static Answer toEntity(final AnswerDto dto) {
        return Answer.builder()
                .author(dto.getAuthor())
                .content(dto.getContent())
                .createDate(dto.getCreateDate())
                .updateDate(dto.getUpdateDate())
                .question(dto.getQuestion())
                .build();
    }
}
