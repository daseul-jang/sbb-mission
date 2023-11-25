package com.techit.missionsbb.question.repository;

import com.techit.missionsbb.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findAllByOrderByCreateDateDesc();

    List<Question> findAllByOrderByIdDesc();
}
