package com.techit.missionsbb.question.service;

import com.techit.missionsbb.common.exception.DataNotFoundException;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Transactional
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
        if (!getList().isEmpty()) questionRepository.deleteAll();
    }

    /**
     * 게시글 단건 조회
     */
    public Question getQuestion(Integer id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("앗! 해당 글이 없어요 😅"));
    }

    public List<Question> getList() {
        //return questionRepository.findAll();
        //return questionRepository.findAllByOrderByCreateDateDesc();
        return questionRepository.findAllByOrderByIdDesc();
    }

    /**
     * 페이지네이션 리스트
     * 생성일 기준으로 내림차순 정렬
     */
    public Page<Question> getPageList(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());
        Page<Question> page = questionRepository.findAll(sortedPageable);
        return Optional.of(page)
                .filter(Slice::hasContent)
                .orElseThrow(() -> new DataNotFoundException("작성된 글이 없어요 🥲"));
    }

    @Transactional
    public Question create(final Question question) {
        return questionRepository.save(question);
    }
}
