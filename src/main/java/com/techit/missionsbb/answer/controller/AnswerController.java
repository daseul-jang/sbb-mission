package com.techit.missionsbb.answer.controller;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.answer.dto.AnswerDto;
import com.techit.missionsbb.answer.service.AnswerService;
import com.techit.missionsbb.common.dto.ErrorResponseDto;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.service.QuestionService;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.service.UserPrincipal;
import com.techit.missionsbb.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/answer")
public class AnswerController {
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final UserService userService;

    @PostMapping("/register/{id}")
    public ResponseEntity<?> createAnswer(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable("id") int id, @RequestBody String content) {
        log.info("createAnswer id: {}", id);
        log.info("createAnswer username: {}", userPrincipal.getUsername());
        log.info("createAnswer content: {}", content);
        ResponseDto<AnswerDto> response;
        try {
            Question questionEntity = questionService.getQuestion(id);
            User userEntity = userService.getUser(userPrincipal.getUsername());
            Answer answerEntity = answerService.create(questionEntity, content, userEntity);
            response = ResponseDto.<AnswerDto>builder().objectData(new AnswerDto(answerEntity)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<AnswerDto>builder().errorData(new ErrorResponseDto(-444, e.getMessage())).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
