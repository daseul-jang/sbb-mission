package com.techit.missionsbb.user.dto;

import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.domain.UserRole;
import com.techit.missionsbb.user.security.domain.RefreshToken;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDto {
    private long id;
    private String username;
    private String password;
    private String email;
    private LocalDateTime createDate;
    private String role;
    private RefreshToken refreshToken;

    public UserDto(final UserLoginDto dto) {
        this.username = dto.getUsername();
        this.password = dto.getPassword();
    }

    public UserDto(final UserSignupDto dto) {
        this.username = dto.getUsername();
        this.password = dto.getPassword();
        this.email = dto.getEmail();
    }

    public UserDto(final User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.email = entity.getEmail();
        this.createDate = entity.getCreateDate();
        this.role = entity.getRole();
        this.refreshToken = entity.getRefreshToken();
    }

    public static User toEntity(final UserDto dto) {
        return User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .role(UserRole.USER.getValue())
                .build();
    }
}
