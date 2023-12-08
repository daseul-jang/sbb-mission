package com.techit.missionsbb.common.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    private String successMessage;
    private ErrorResponseDto errorData;
    private List<T> listData;
    private Page<T> pageData;
    private T objectData;

    public ResponseDto(String successMessage) {
        this.successMessage = successMessage;
    }

    public ResponseDto(T obj) {
        this.objectData = obj;
    }
}
