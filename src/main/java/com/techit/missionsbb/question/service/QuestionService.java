package com.techit.missionsbb.question.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import com.techit.missionsbb.common.exception.DataNotFoundException;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.repository.QuestionRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    /**
     * 게시글 단건 조회
     */
    public Question getQuestion(int id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("앗! 해당 글이 없어요 😅"));
    }

    public List<Question> getList() {
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
    public void delete(final Question question, final String username) {
        if (!question.getAuthor().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제 권한이 없습니다.");
        }

        questionRepository.delete(question);
    }

    @Transactional
    public Question modify(final Question question, final String authenticateUser) {
        if (!question.getAuthor().getUsername().equals(authenticateUser)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 권한이 없습니다.");
        }

        return questionRepository.save(question);
    }

    @Transactional
    public Question create(final Question question) {
        return questionRepository.save(question);
    }
}
