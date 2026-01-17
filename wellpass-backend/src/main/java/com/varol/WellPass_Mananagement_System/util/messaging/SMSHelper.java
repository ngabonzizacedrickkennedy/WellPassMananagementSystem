package com.varol.WellPass_Mananagement_System.util.messaging;

public class SMSHelper {

    private static final int MAX_SMS_LENGTH = 160;

    public static String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null) {
            return null;
        }
        return phoneNumber.replaceAll("[^0-9+]", "");
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return false;
        }
        String formatted = formatPhoneNumber(phoneNumber);
        return formatted.matches("^\\+?[1-9]\\d{9,14}$");
    }

    public static String truncateMessage(String message) {
        if (message == null) {
            return "";
        }
        if (message.length() <= MAX_SMS_LENGTH) {
            return message;
        }
        return message.substring(0, MAX_SMS_LENGTH - 3) + "...";
    }

    public static String buildOTPMessage(String otpCode, int expiryMinutes) {
        return String.format(
                "Your WellPass verification code is: %s\nValid for %d minutes.\nDo not share this code.",
                otpCode, expiryMinutes
        );
    }
}