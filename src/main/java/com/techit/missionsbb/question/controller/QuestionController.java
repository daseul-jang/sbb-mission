package com.techit.missionsbb.question.controller;

import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.dto.QuestionDto;
import com.techit.missionsbb.question.dto.QuestionRequestDto;
import com.techit.missionsbb.question.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        ResponseDto<QuestionDto> response;
        try {
            List<Question> questionEntities = questionService.getList();
            List<QuestionDto> questionDtos = questionEntities.stream().map(QuestionDto::new).toList();
            response = ResponseDto.<QuestionDto>builder().listData(questionDtos).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<QuestionDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody QuestionRequestDto reqDto) {
        ResponseDto<QuestionDto> response;
        try {
            Question questionEntitiy = questionService.create(QuestionDto.toEntity(new QuestionDto(reqDto)));
            response = ResponseDto.<QuestionDto>builder().objData(new QuestionDto(questionEntitiy)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<QuestionDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
