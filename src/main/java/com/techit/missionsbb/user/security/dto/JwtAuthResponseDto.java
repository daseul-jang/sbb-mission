package com.techit.missionsbb.user.security.dto;

import com.techit.missionsbb.user.domain.User;
import lombok.*;

@ToString
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
public class JwtAuthResponseDto {
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType = "Bearer";
    private User user;
}
