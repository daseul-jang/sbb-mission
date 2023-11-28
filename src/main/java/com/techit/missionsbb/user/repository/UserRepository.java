package com.techit.missionsbb.user.repository;

import com.techit.missionsbb.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
