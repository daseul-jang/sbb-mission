package com.techit.missionsbb.question.controller;

import lombok.extern.log4j.Log4j2;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import jakarta.validation.Valid;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.question.domain.Question;
import com.techit.missionsbb.question.dto.QuestionDto;
import com.techit.missionsbb.question.dto.QuestionRequestDto;
import com.techit.missionsbb.question.service.QuestionService;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.service.UserPrincipal;
import com.techit.missionsbb.user.service.UserService;
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
    private final UserService userService;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") int id) {
        Question questionEntity = questionService.getQuestion(id);

        ResponseDto<QuestionDto> response = ResponseDto.<QuestionDto>builder()
                .objectData(new QuestionDto(questionEntity))
                .build();

        return ResponseEntity.ok(response);
    }

    /**
     * 페이지네이션 리스트 요청
     */
    @GetMapping("/list")
    public ResponseEntity<?> list(Pageable pageable) {
        Page<Question> questionEntities = questionService.getPageList(pageable);
        List<QuestionDto> questionDtos = questionEntities.stream().map(QuestionDto::new).toList();
        Page<QuestionDto> questionPageList = new PageImpl<>(questionDtos, pageable, questionEntities.getTotalElements());

        ResponseDto<QuestionDto> response = ResponseDto.<QuestionDto>builder()
                .pageData(questionPageList)
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                    @PathVariable("id") int id) {
        Question questionEntity = questionService.getQuestion(id);
        questionService.delete(questionEntity, userPrincipal.getUsername());

        return ResponseEntity.ok(new ResponseDto<>("삭제 성공"));
    }

    @PutMapping("/modify/{id}")
    public ResponseEntity<?> modify(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                    @PathVariable("id") int id,
                                    @Valid @RequestBody QuestionRequestDto reqDto) {
        Question questionEntity = questionService.getQuestion(id);

        questionEntity = questionEntity.toBuilder()
                .subject(reqDto.getSubject())
                .content(reqDto.getContent())
                .build();

        questionEntity = questionService.modify(questionEntity, userPrincipal.getUsername());

        ResponseDto<QuestionDto> response = ResponseDto.<QuestionDto>builder()
                .objectData(new QuestionDto(questionEntity))
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                      @Valid @RequestBody QuestionRequestDto reqDto) {
        User userEntity = userService.getUser(userPrincipal.getUsername());
        Question questionEntity = questionService.create(QuestionDto.toEntity(new QuestionDto(reqDto, userEntity)));

        ResponseDto<QuestionDto> response = ResponseDto.<QuestionDto>builder()
                .objectData(new QuestionDto(questionEntity))
                .build();

        return ResponseEntity.ok(response);

    }
}
