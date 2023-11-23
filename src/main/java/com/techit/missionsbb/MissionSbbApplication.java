package com.techit.missionsbb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MissionSbbApplication {

    public static void main(String[] args) {
        SpringApplication.run(MissionSbbApplication.class, args);
    }

}
