package com.techit.missionsbb.question.domain;

import com.techit.missionsbb.common.domain.DateEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Question extends DateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Builder
    public Question(Integer id, String subject, String content) {
        this.id = id;
        this.subject = subject;
        this.content = content;
    }
}