package com.techit.missionsbb.user.security.service;

import lombok.*;
import lombok.extern.log4j.Log4j2;
import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.domain.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@ToString
@Log4j2
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPrincipal implements UserDetails {
    private User user;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public static UserPrincipal create(User user) {
        log.info("create user.getName : {}", user.getUsername());
        List<GrantedAuthority> authorities = Collections.
                singletonList(
                        new SimpleGrantedAuthority(
                                "admin".equals(user.getUsername()) ?
                                        UserRole.ADMIN.getValue() : UserRole.USER.getValue()
                        )
                );

        log.info("create authorities: {}", authorities.toString());

        return UserPrincipal.builder()
                .user(user)
                .authorities(authorities)
                .build();
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        log.info("UserPrincipal create attributes: {}", attributes);
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
