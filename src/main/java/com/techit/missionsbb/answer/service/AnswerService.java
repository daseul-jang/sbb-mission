package com.techit.missionsbb.answer.service;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.answer.repository.AnswerRepository;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer create(final Question question, String content, User user) {
        Answer answer = Answer.builder()
                .question(question)
                .author(user)
                .content(content)
                .build();
        return answerRepository.save(answer);
    }
}
