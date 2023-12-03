package com.techit.missionsbb.user.controller;

import com.techit.missionsbb.common.dto.ErrorResponseDto;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.dto.JwtAuthResponseDto;
import com.techit.missionsbb.user.dto.UserLoginDto;
import com.techit.missionsbb.user.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody UserLoginDto dto) {
        log.info(dto);
        ResponseDto<JwtAuthResponseDto> response;
        User user = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
        try {
            JwtAuthResponseDto jwtDto = authService.authenticate(user);
            response = ResponseDto.<JwtAuthResponseDto>builder().objectData(jwtDto).build();
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            String errorMsg = null;
            if (e instanceof InternalAuthenticationServiceException ||
                    e instanceof BadCredentialsException) {
                errorMsg = "아이디 또는 비밀번호를 다시 한번 확인해 주세요.";
            } else {
                errorMsg = "알 수 없는 오류입니다.";
            }
            log.error(errorMsg);
            response = ResponseDto.<JwtAuthResponseDto>builder().errorData(new ErrorResponseDto(-999, errorMsg)).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reissue-access-token")
    public ResponseEntity<?> reissueAccessToken(@RequestBody String refreshToken) {
        ResponseDto<JwtAuthResponseDto> response;
        try {
            response = ResponseDto.<JwtAuthResponseDto>builder().objectData(authService.newAccessToken(refreshToken)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<JwtAuthResponseDto>builder().errorData(new ErrorResponseDto(-900, e.getMessage())).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
