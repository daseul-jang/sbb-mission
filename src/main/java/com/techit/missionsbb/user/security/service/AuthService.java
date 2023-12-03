package com.techit.missionsbb.user.security.service;

import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.security.dto.JwtAuthResponseDto;
import com.techit.missionsbb.user.security.domain.RefreshToken;
import com.techit.missionsbb.user.security.jwt.TokenProvider;
import com.techit.missionsbb.user.security.repository.RefreshTokenRepository;
import com.techit.missionsbb.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    @Transactional
    public JwtAuthResponseDto authenticate(final User user) {
        Authentication authentication = authenticateUser(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        RefreshToken refreshToken = checkAndCreateRefreshToken(authentication);

        return new JwtAuthResponseDto(
                tokenProvider.createAccessToken(authentication),
                refreshToken.getToken(),
                refreshToken.getUser()
        );
    }

    private Authentication authenticateUser(User user) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(), user.getPassword()
                )
        );
    }

    private RefreshToken checkAndCreateRefreshToken(Authentication authentication) {
        User authenticateUser = userService.getUser(authentication.getName());
        RefreshToken refreshToken = refreshTokenRepository.findByUser(authenticateUser).orElse(null);

        if (refreshToken == null) {
            refreshToken = tokenProvider.createRefreshToken(authentication);
            refreshToken = refreshToken.toBuilder().user(authenticateUser).build();
            refreshToken = refreshTokenRepository.save(refreshToken);
        }

        return refreshToken;
    }

    public JwtAuthResponseDto newAccessToken(String requestRefreshToken) {
        log.info("newAccessToken");
        if (!tokenProvider.validateToken(requestRefreshToken)) {
            throw new RuntimeException("Refresh Token 검증 실패");
        }

        Authentication authentication = tokenProvider.getAuthentication(requestRefreshToken);
        User user = userService.getUser(authentication.getName());
        RefreshToken refreshToken = refreshTokenRepository.findByUser(user).orElse(null);
        assert refreshToken != null;
        log.info(refreshToken.toString());
        if (!refreshToken.getToken().equals(requestRefreshToken)) {
            throw new RuntimeException("토큰이 일치하지 않습니다.");
        }

        return new JwtAuthResponseDto(tokenProvider.createAccessToken(authentication), refreshToken.getToken(), user);
    }
}
