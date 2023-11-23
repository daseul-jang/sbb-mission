package com.techit.missionsbb.question.repository;

import com.techit.missionsbb.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
