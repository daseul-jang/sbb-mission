package com.techit.missionsbb.common.exception;

import com.techit.missionsbb.user.security.exception.UserNotFoundException;
import lombok.extern.log4j.Log4j2;
import com.techit.missionsbb.common.dto.ErrorResponseDto;
import com.techit.missionsbb.common.dto.ResponseDto;
import org.springframework.beans.TypeMismatchException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Log4j2
@RestControllerAdvice
public class ApiControllerAdvice {
    /**
     * 데이터베이스 관련 예외 처리
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationExceptions(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(commonException(HttpStatus.CONFLICT.value(), ex));
    }

    /*@ExceptionHandler(BindException.class)
    public ResponseEntity<?> handleBindExceptions(BindException ex) {
        log.info("handleBindExceptions");
        BindingResult bindingResult = ex.getBindingResult();
        String errorMessage = Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage();
        ResponseDto<ErrorResponseDto> response = ResponseDto.<ErrorResponseDto>builder()
                .errorData(new ErrorResponseDto(HttpStatus.BAD_REQUEST.value(), ex.getClass().getName(), errorMessage)).build();
        return ResponseEntity.badRequest().body(response);
    }*/

    /**
     * 로그인 실패시 예외 처리
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(AuthenticationException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.UNAUTHORIZED.value(), ex));
    }

    /**
     * 접근 권한이 없을 경우 예외 처리
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(AccessDeniedException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.FORBIDDEN.value(), ex));
    }

    /**
     * 유효성 검증 예외 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.info("Valid 예외 처리");
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors()
                .forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));

        ResponseDto<ErrorResponseDto> response = ResponseDto.<ErrorResponseDto>builder()
                .errorData(new ErrorResponseDto(ex.getStatusCode().value(), ex.getClass().getName(), errors)).build();

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 요청 본문을 서버가 읽을 수 없거나, 문법적으로 올바르지 않을 때 예외 처리
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.BAD_REQUEST.value(), ex));
    }

    /**
     * 요청에서 필수 파라미터가 누락되었을 때 예외 처리
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(MissingServletRequestParameterException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.BAD_REQUEST.value(), ex));
    }

    /**
     * 요청 파라미터 타입이 메서드의 매개변수 타입과 불일치 시 예외 처리
     */
    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<?> handleMethodNotSupportedExceptions(TypeMismatchException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.BAD_REQUEST.value(), ex));
    }

    /**
     * 메소드에 부적절한 인자가 전달되었을 때 발생하는 예외 처리
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentExceptions(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(commonException(HttpStatus.BAD_REQUEST.value(), ex));
    }

    /**
     * 서버가 지원하지 않는 HTTP 메서드 요청에 대한 예외 처리
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<?> handleMethodNotSupportedExceptions(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(commonException(HttpStatus.METHOD_NOT_ALLOWED.value(), ex));
    }

    /**
     * 서버 예외 처리
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllExceptions(Exception ex) {
        log.info("전체 예외 처리");
        return ResponseEntity.internalServerError().body(commonException(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex));
    }

    /**
     * ResponseStatusException 관련 예외 처리
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatusExceptions(ResponseStatusException ex) {
        log.info("ResponseStatusException 처리");
        ResponseDto<ErrorResponseDto> response = ResponseDto.<ErrorResponseDto>builder()
                .errorData(new ErrorResponseDto(ex.getStatusCode().value(), ex.getClass().getName(), ex.getReason())).build();
        return ResponseEntity.status(ex.getStatusCode()).body(response);
    }

    /**
     * 커스텀 예외 처리
     * 게시글 데이터가 없을 시 예외 처리
     */
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<?> handleDataNotFoundExceptions(DataNotFoundException ex) {
        return ResponseEntity.internalServerError().body(commonException(HttpStatus.NOT_FOUND.value(), ex));
    }

    /**
     * 커스텀 예외 처리
     * 해당 회원이 없을 시 예외 처리
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundExceptions(UserNotFoundException ex) {
        return ResponseEntity.internalServerError().body(commonException(HttpStatus.NOT_FOUND.value(), ex));
    }

    public ResponseDto<ErrorResponseDto> commonException(int status, Exception ex) {
        return ResponseDto.<ErrorResponseDto>builder()
                .errorData(new ErrorResponseDto(status, ex.getClass().getName(), ex.getMessage())).build();
    }
}
