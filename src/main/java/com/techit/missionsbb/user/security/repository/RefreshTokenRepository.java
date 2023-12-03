package com.techit.missionsbb.user.security.repository;

import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByUser(final User user);
}
