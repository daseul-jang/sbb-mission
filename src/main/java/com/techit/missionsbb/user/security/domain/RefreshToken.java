package com.techit.missionsbb.user.security.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techit.missionsbb.common.domain.DateEntity;
import com.techit.missionsbb.user.domain.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.time.LocalDateTime;

@ToString
@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "refresh_token_tb")
public class RefreshToken extends DateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String token;

    private Instant expiryDate;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreatedDate
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;
}
