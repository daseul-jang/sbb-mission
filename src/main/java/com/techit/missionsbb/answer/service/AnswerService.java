package com.techit.missionsbb.answer.service;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.answer.repository.AnswerRepository;
import com.techit.missionsbb.common.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    @Transactional
    public void delete(final Answer answer, final String username) {
        if (!answer.getAuthor().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제 권한이 없습니다.");
        }

        answerRepository.delete(answer);
    }

    @Transactional
    public Answer modify(Answer answer, String username) {
        if (!answer.getAuthor().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 권한이 없습니다.");
        }

        return answerRepository.save(answer.toBuilder().content(answer.getContent()).build());
    }

    public Answer getAnswer(int id) {
        return answerRepository.findById(id).orElseThrow(() -> new DataNotFoundException("답변을 찾을 수 없어요 😅"));
    }

    @Transactional
    public Answer create(final Answer answer) {
        return answerRepository.save(answer);
    }
}
