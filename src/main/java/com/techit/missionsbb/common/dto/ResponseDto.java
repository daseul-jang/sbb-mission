package com.techit.missionsbb.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    private String error;
    private List<T> listData;
    private T objData;

    public ResponseDto(List<T> list) {
        this.listData = list;
    }

    public ResponseDto(T obj) {
        this.objData = obj;
    }
}
