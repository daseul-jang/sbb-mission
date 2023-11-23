package com.techit.missionsbb.answer.repository;

import com.techit.missionsbb.answer.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
