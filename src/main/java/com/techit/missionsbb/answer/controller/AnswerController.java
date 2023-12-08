package com.techit.missionsbb.answer.controller;

import com.techit.missionsbb.answer.domain.Answer;
import com.techit.missionsbb.answer.dto.AnswerDto;
import com.techit.missionsbb.answer.service.AnswerService;
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAnswer(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @PathVariable("id") int id) {
        Answer answerEntity = answerService.getAnswer(id);
        answerService.delete(answerEntity, userPrincipal.getUsername());

        return ResponseEntity.ok(new ResponseDto<>("삭제 성공"));
    }

    @PutMapping("/modify/{id}")
    public ResponseEntity<?> modifyAnswer(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @PathVariable("id") int id,
                                          @RequestBody String content) {
        Answer answerEntity = answerService.getAnswer(id);

        answerEntity = answerService.modify(
                answerEntity.toBuilder()
                        .content(content)
                        .build(),
                userPrincipal.getUsername());

        ResponseDto<AnswerDto> response = ResponseDto.<AnswerDto>builder()
                .objectData(new AnswerDto(answerEntity))
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register/{id}")
    public ResponseEntity<?> createAnswer(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @PathVariable("id") int id,
                                          @RequestBody String content) {
        Question questionEntity = questionService.getQuestion(id);
        User userEntity = userService.getUser(userPrincipal.getUsername());

        Answer answerEntity = Answer.builder()
                .question(questionEntity)
                .author(userEntity)
                .content(content)
                .build();

        answerEntity = answerService.create(answerEntity);

        ResponseDto<AnswerDto> response = ResponseDto.<AnswerDto>builder()
                .objectData(new AnswerDto(answerEntity))
                .build();

        return ResponseEntity.ok(response);
    }
}
