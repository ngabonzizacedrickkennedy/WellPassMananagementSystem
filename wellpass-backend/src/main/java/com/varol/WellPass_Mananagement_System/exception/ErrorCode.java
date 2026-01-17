package com.varol.WellPass_Mananagement_System.exception;

public enum ErrorCode {
    RESOURCE_NOT_FOUND("ERR_001", "Resource not found"),
    DUPLICATE_RESOURCE("ERR_002", "Resource already exists"),
    INVALID_CREDENTIALS("ERR_003", "Invalid credentials"),
    UNAUTHORIZED("ERR_004", "Unauthorized access"),
    VALIDATION_ERROR("ERR_005", "Validation failed"),
    AUTHENTICATION_FAILED("ERR_006", "Authentication failed"),
    INTERNAL_SERVER_ERROR("ERR_007", "Internal server error"),

    INVALID_OTP("ERR_101", "Invalid OTP code"),
    EXPIRED_OTP("ERR_102", "OTP has expired"),

    EMPLOYEE_NOT_FOUND("ERR_201", "Employee not found"),
    DUPLICATE_EMPLOYEE("ERR_202", "Employee already exists"),

    SERVICE_NOT_AVAILABLE("ERR_301", "Service is not available"),

    FILE_STORAGE_ERROR("ERR_401", "File storage error"),

    INVOICE_GENERATION_ERROR("ERR_501", "Invoice generation failed");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}