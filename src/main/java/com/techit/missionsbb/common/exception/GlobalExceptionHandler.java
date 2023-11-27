package com.techit.missionsbb.common.exception;

import com.techit.missionsbb.answer.dto.AnswerDto;
import com.techit.missionsbb.common.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto<AnswerDto>> handleException(Exception e) {
        ResponseDto<AnswerDto> response = ResponseDto.<AnswerDto>builder().error(e.getMessage()).build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}