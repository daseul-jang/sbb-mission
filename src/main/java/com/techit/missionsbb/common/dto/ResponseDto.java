package com.techit.missionsbb.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    //private String error;
    private String successMessage;
    private ErrorResponseDto errorData;
    private List<T> listData;
    private Page<T> pageData;
    private T objectData;

    public ResponseDto(String successMessage) {
        this.successMessage = successMessage;
    }

    public ResponseDto(List<T> list) {
        this.listData = list;
    }

    public ResponseDto(T obj) {
        this.objectData = obj;
    }
}
