package com.techit.missionsbb.answer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techit.missionsbb.common.domain.DateEntity;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.user.domain.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Entity
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "answer_tb")
public class Answer extends DateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User author;

    @Column(columnDefinition = "TEXT")
    private String content;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;
}
