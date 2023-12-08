package com.techit.missionsbb.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDto {
    private int errorStatus;
    private String errorCode;
    private String errorMessage;
    private String errorType;
    private Map<String, String> validError;

    public ErrorResponseDto(int errorStatus, String errorMessage) {
        this.errorStatus = errorStatus;
        this.errorMessage = errorMessage;
    }

    public ErrorResponseDto(int errorStatus, String errorType, String errorMessage) {
        this.errorStatus = errorStatus;
        this.errorType = errorType;
        this.errorMessage = errorMessage;
    }

    public ErrorResponseDto(Map<String, String> errors) {
        this.validError = errors;
    }

    public ErrorResponseDto(int errorStatus, String errorType, Map<String, String> errors) {
        this.errorStatus = errorStatus;
        this.errorType = errorType;
        this.validError = errors;
    }
}
