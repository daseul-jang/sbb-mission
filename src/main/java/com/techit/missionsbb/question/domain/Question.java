package com.techit.missionsbb.question.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.common.domain.DateEntity;
import com.techit.missionsbb.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "question_db")
public class Question extends DateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200)
    private String subject;

    @ManyToOne
    private User author;

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Answer> answerList;
}

