package com.varol.WellPass_Mananagement_System.exception.custom;

public class InvalidOTPException extends RuntimeException {
    public InvalidOTPException(String message) {
        super(message);
    }
}