package com.techit.missionsbb.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSignupDto {
    //@Size(min = 3, max = 25)
    @NotEmpty(message = "사용자 ID는 필수 항목입니다.")
    private String username;

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    private String password;

    @NotEmpty(message = "비밀번호 확인 필수 항목입니다.")
    private String passwordCheck;

    @Email
    @NotEmpty(message = "이메일은 필수 항목입니다.")
    private String email;

    public boolean passwordVerification() {
        return this.password.equals(this.passwordCheck);
    }
}
