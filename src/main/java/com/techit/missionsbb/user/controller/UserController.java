package com.techit.missionsbb.user.controller;

import com.techit.missionsbb.common.dto.ResponseDto;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.dto.UserDto;
import com.techit.missionsbb.user.dto.UserRequestDto;
import com.techit.missionsbb.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
    public ResponseEntity<?> signup(@Valid @RequestBody UserRequestDto reqDto, BindingResult bindingResult) {
        log.info("user request dto : {}", reqDto.toString());
        ResponseDto<UserDto> response;
        try {
            if (bindingResult.hasErrors()) throw new RuntimeException("올바르지 않은 데이터 형식입니다.");
            if (!reqDto.passwordVerification())
                bindingResult.rejectValue("passwordCheck", "passwordInCorrect", "비밀번호가 일치하지 않습니다.");
            User userEntity = userService.registerUser(UserDto.toEntity(new UserDto(reqDto)));
            response = ResponseDto.<UserDto>builder().objData(new UserDto(userEntity)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<UserDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
