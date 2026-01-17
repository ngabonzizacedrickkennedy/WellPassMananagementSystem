package com.varol.WellPass_Mananagement_System.exception.custom;

public class ServiceNotAvailableException extends RuntimeException {
    public ServiceNotAvailableException(String message) {
        super(message);
    }
}