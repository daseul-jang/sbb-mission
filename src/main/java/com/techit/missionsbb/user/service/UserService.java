package com.techit.missionsbb.user.service;

import com.techit.missionsbb.user.domain.User;
import com.techit.missionsbb.user.domain.UserRole;
import com.techit.missionsbb.user.repository.UserRepository;
import com.techit.missionsbb.user.security.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUser(final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("회원을 찾을 수 없어요."));
    }

    public User saveOrUpdateUser(final User user) {
        return userRepository.save(user);
    }

    public User registerUser(final User user) {
        User encodingUser = User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .email(user.getEmail())
                .role(UserRole.USER.getValue())
                .build();
        return userRepository.save(encodingUser);
    }
}
