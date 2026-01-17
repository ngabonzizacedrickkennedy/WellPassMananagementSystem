package com.varol.WellPass_Mananagement_System.service.auth;

public interface PasswordResetService {

    void sendPasswordResetEmail(String email);

    void resetPassword(String token, String newPassword);

    boolean validateResetToken(String token);
}