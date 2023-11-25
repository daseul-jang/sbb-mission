package com.techit.missionsbb.question.service;

import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public void insertDummyData(Integer limit) {
        //deleteDummyData();
        for (int i = 1; i <= limit; i++) {
            Question question = Question.builder()
                    .subject("제목 테스트 " + i)
                    .content("내용 테스트 " + i)
                    .build();

            questionRepository.save(question);
        }
    }

    @Transactional
    public void deleteDummyData() {
        questionRepository.deleteAll();
    }

    public List<Question> getList() {
        //return questionRepository.findAll();
        //return questionRepository.findAllByOrderByCreateDateDesc();
        return questionRepository.findAllByOrderByIdDesc();
    }

    public Page<Question> getPageList(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("createDate").descending());
        return questionRepository.findAll(sortedPageable);
    }

    public Question create(final Question question) {
        return questionRepository.save(question);
    }
}
