package com.techit.missionsbb.user.security.jwt;

import com.techit.missionsbb.user.security.domain.RefreshToken;
import com.techit.missionsbb.user.security.service.UserPrincipal;
import com.techit.missionsbb.user.security.service.UserDetailsServiceImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Component
@RequiredArgsConstructor
public class TokenProvider {
    @Value("${app.jwt.token-secret}")
    private String tokenSecret;

    @Value("${app.jwt.token-expiration-msec}")
    private long accessTokenExpirationMsec;

    @Value("${app.jwt.token-reftesh-msec}")
    private long refreshTokenExpirationMsec;

    private final UserDetailsServiceImpl userDetailsService;

    public SecretKey createKey(String tokenSecret) {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenSecret));
    }

    public String createAccessToken(Authentication authentication) {
        return createToken(authentication, accessTokenExpirationMsec);
    }

    public RefreshToken createRefreshToken(Authentication authentication) {
        String token = createToken(authentication, refreshTokenExpirationMsec);
        Date expiryDate = new Date(new Date().getTime() + refreshTokenExpirationMsec);
        return RefreshToken.builder()
                .token(token)
                .expiryDate(expiryDate.toInstant())
                .build();
    }

    public String createToken(Authentication authentication, long tokenTime) {
        /*String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));*/
        Date expiryDate = new Date(new Date().getTime() + tokenTime);

        return Jwts.builder()
                //.claim("role", authorities)
                .claim("username", authentication.getName())
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(expiryDate)
                .signWith(createKey(tokenSecret))
                .compact();
    }

    /**
     * 토큰에서 사용자 이름(username) 추출
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parser().verifyWith(createKey(tokenSecret)).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public Authentication getAuthentication(String token) {
        UserPrincipal userPrincipal = (UserPrincipal) userDetailsService.loadUserByUsername(getUsernameFromToken(token));
        return new UsernamePasswordAuthenticationToken(userPrincipal, "", userPrincipal.getAuthorities());
    }

    public String getBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(createKey(tokenSecret)).build().parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            throw new JwtException("잘못된 서명입니다.", e.getCause());
        } catch (MalformedJwtException e) {
            throw new JwtException("올바른 토큰 형식이 아닙니다.", e.getCause());
        } catch (ExpiredJwtException e) {
            throw new JwtException("만료된 토큰입니다.", e.getCause());
        } catch (UnsupportedJwtException e) {
            throw new JwtException("지원하지 않는 토큰 형식입니다.", e.getCause());
        } catch (IllegalArgumentException e) {
            throw new JwtException("토큰이 존재하지 않습니다.", e.getCause());
        }
    }
}
