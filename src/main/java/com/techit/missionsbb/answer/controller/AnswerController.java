package com.techit.missionsbb.answer.controller;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.answer.dto.AnswerDto;
import com.techit.missionsbb.answer.service.AnswerService;
import com.techit.missionsbb.common.dto.ErrorResponseDto;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/answer")
public class AnswerController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    /*@GetMapping("/list")
    public ResponseEntity<?> list() {
        ResponseDto<AnswerDto> response;
        try {

        } catch (Exception e) {

        }
    }*/

    @PostMapping("/register/{id}")
    public ResponseEntity<?> createAnswer(@PathVariable("id") int id, @RequestBody String content) {
        log.info("id: {}", id);
        log.info("content: {}", content);
        ResponseDto<AnswerDto> response;
        try {
            Question question = questionService.getQuestion(id);
            Answer answerEntity = answerService.create(question, content);
            response = ResponseDto.<AnswerDto>builder().objectData(new AnswerDto(answerEntity)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<AnswerDto>builder().errorData(new ErrorResponseDto(-444, e.getMessage())).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
