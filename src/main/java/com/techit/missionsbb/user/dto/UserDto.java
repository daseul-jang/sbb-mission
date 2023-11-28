package com.techit.missionsbb.user.dto;

import com.techit.missionsbb.user.domain.User;
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

    public UserDto(final UserRequestDto dto) {
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
    }

    public static User toEntity(final UserDto dto) {
        return User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
    }
}
