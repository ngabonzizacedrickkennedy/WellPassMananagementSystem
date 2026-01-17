package com.varol.WellPass_Mananagement_System.util.otp;

import java.time.LocalDateTime;

public class OTPValidator {

    public static boolean isOTPExpired(LocalDateTime expirationTime) {
        return LocalDateTime.now().isAfter(expirationTime);
    }

    public static boolean isOTPValid(String inputOTP, String storedOTP) {
        if (inputOTP == null || storedOTP == null) {
            return false;
        }
        return inputOTP.equals(storedOTP);
    }

    public static boolean isNumericOTP(String otp) {
        if (otp == null || otp.isEmpty()) {
            return false;
        }
        return otp.matches("\\d+");
    }

    public static boolean isValidOTPLength(String otp, int expectedLength) {
        return otp != null && otp.length() == expectedLength;
    }
}