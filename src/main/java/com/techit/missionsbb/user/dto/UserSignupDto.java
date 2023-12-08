package com.techit.missionsbb.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSignupDto {
    @Size(min = 3, max = 25, message = "아이디의 길이는 3 ~ 25 사이어야 합니다.")
    @NotBlank(message = "사용자 아이디는 필수 항목입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    private String password;

    @NotBlank(message = "비밀번호 확인란은 필수 항목입니다.")
    private String passwordCheck;

    @Email
    @NotBlank(message = "이메일은 필수 항목입니다.")
    private String email;

    public boolean passwordVerification() {
        return this.password.equals(this.passwordCheck);
    }
}
