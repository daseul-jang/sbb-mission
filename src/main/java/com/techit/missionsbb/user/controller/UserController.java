package com.techit.missionsbb.user.controller;

import lombok.extern.log4j.Log4j2;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.common.exception.PasswordNotMatchException;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.dto.UserDto;
import com.techit.missionsbb.user.dto.UserSignupDto;
import com.techit.missionsbb.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserSignupDto reqDto) {
        if (!reqDto.passwordVerification()) {
            throw new PasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }

        User userEntity = userService.registerUser(UserDto.toEntity(new UserDto(reqDto)));

        ResponseDto<UserDto> response = ResponseDto.<UserDto>builder()
                .objectData(new UserDto(userEntity))
                .build();

        return ResponseEntity.ok(response);
    }
}
