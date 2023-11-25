package com.techit.missionsbb.question.dto;

import com.techit.missionsbb.question.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
public class QuestionDto {
    private Integer id;
    private String subject;
    private String content;
    private LocalDateTime createDate;

    @Builder
    public QuestionDto(Integer id, String subject, String content, LocalDateTime createDate) {
        this.id = id;
        this.subject = subject;
        this.content = content;
        this.createDate = createDate;
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
    }

    public static Question toEntity(final QuestionDto dto) {
        return Question.builder()
                .id(dto.getId())
                .subject(dto.getSubject())
                .content(dto.getContent())
                .build();
    }
}
