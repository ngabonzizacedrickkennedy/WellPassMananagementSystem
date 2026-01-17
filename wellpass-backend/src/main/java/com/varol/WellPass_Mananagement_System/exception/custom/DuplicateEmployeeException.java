package com.varol.WellPass_Mananagement_System.exception.custom;

public class DuplicateEmployeeException extends RuntimeException {
    public DuplicateEmployeeException(String message) {
        super(message);
    }
}