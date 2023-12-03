package com.techit.missionsbb.user.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLoginDto {
    @NotEmpty(message = "사용자 ID는 필수 항목입니다.")
    private String username;

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    private String password;
}
