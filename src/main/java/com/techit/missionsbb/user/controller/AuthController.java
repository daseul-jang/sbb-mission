package com.techit.missionsbb.user.controller;

import lombok.extern.log4j.Log4j2;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.dto.JwtAuthResponseDto;
import com.techit.missionsbb.user.dto.UserLoginDto;
import com.techit.missionsbb.user.security.service.AuthService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> signIn(@Valid @RequestBody UserLoginDto dto) {
        User user = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();

        JwtAuthResponseDto jwtDto = authService.authenticate(user);

        ResponseDto<JwtAuthResponseDto> response = ResponseDto.<JwtAuthResponseDto>builder()
                .objectData(jwtDto)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reissue-access-token")
    public ResponseEntity<?> reissueAccessToken(@RequestBody String refreshToken) {
        ResponseDto<JwtAuthResponseDto> response = ResponseDto.<JwtAuthResponseDto>builder()
                .objectData(authService.newAccessToken(refreshToken))
                .build();

        return ResponseEntity.ok(response);
    }
}
