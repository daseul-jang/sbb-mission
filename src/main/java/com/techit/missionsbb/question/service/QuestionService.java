package com.techit.missionsbb.question.service;

import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public List<Question> getList() {
        return questionRepository.findAll();
    }

    public Question create(final Question question) {
        return questionRepository.save(question);
    }
}
