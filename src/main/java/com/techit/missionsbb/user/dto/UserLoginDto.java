package com.techit.missionsbb.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLoginDto {
    @NotBlank(message = "아이디는 필수 항목입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    private String password;
}
