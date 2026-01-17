package com.varol.WellPass_Mananagement_System.exception.custom;

public class ExpiredOTPException extends RuntimeException {
    public ExpiredOTPException(String message) {
        super(message);
    }
}