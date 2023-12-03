package com.techit.missionsbb.user.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("doFilterInternal");
            log.info(request.getHeader("Authorization"));
            String accessToken = tokenProvider.getBearerToken(request);
            log.info("doFilterInternal accessToken: {}", accessToken);

            AbstractAuthenticationToken authentication = new AnonymousAuthenticationToken(
                    "anonymous", Optional.empty(), Collections.singletonList(new SimpleGrantedAuthority("anonymous"))
            );

            if (StringUtils.hasText(accessToken) && tokenProvider.validateToken(accessToken)) {
                authentication = (AbstractAuthenticationToken) tokenProvider.getAuthentication(accessToken);
            }
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            log.error("{}: {}", "로그인 실패", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
