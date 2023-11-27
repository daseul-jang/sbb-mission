package com.techit.missionsbb.question.controller;

import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.dto.QuestionDto;
import com.techit.missionsbb.question.dto.QuestionRequestDto;
import com.techit.missionsbb.question.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/test")
    public ResponseEntity<?> addTestDate() {
        // list 호출 시 더미데이터 생성
        questionService.deleteDummyData();
        questionService.insertDummyData(305);
        return ResponseEntity.ok("데이터추가완.");
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Integer id) {
        ResponseDto<QuestionDto> response;
        try {
            Question questionEntity = questionService.getQuestion(id);
            response = ResponseDto.<QuestionDto>builder().objData(new QuestionDto(questionEntity)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<QuestionDto>builder().error(e.getMessage()).build();
            return ResponseEntity.ok(response);
        }
    }

    /**
     * 페이지네이션 리스트 요청
     */
    @GetMapping("/list")
    public ResponseEntity<?> list(Pageable pageable) {
        log.info(pageable);
        ResponseDto<QuestionDto> response;
        try {
            Page<Question> questionEntities = questionService.getPageList(pageable);
            List<QuestionDto> questionDtos = questionEntities.stream().map(QuestionDto::new).toList();
            Page<QuestionDto> questionPageList = new PageImpl<>(questionDtos, pageable, questionEntities.getTotalElements());
            response = ResponseDto.<QuestionDto>builder().pageData(questionPageList).build();
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
            Question questionEntity = questionService.create(QuestionDto.toEntity(new QuestionDto(reqDto)));
            response = ResponseDto.<QuestionDto>builder().objData(new QuestionDto(questionEntity)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<QuestionDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
