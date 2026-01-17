package com.varol.WellPass_Mananagement_System.util.otp;

import java.security.SecureRandom;

public class OTPGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final int DEFAULT_OTP_LENGTH = 6;

    public static String generateNumericOTP() {
        return generateNumericOTP(DEFAULT_OTP_LENGTH);
    }

    public static String generateNumericOTP(int length) {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    public static String generateAlphanumericOTP(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(characters.charAt(random.nextInt(characters.length())));
        }
        return otp.toString();
    }
}