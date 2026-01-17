package com.varol.WellPass_Mananagement_System.implementation.auth;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.varol.WellPass_Mananagement_System.model.auth.PasswordResetToken;
import com.varol.WellPass_Mananagement_System.model.user.User;
import com.varol.WellPass_Mananagement_System.exception.custom.ResourceNotFoundException;
import com.varol.WellPass_Mananagement_System.repository.auth.PasswordResetTokenRepository;
import com.varol.WellPass_Mananagement_System.repository.user.UserRepository;
import com.varol.WellPass_Mananagement_System.service.auth.PasswordResetService;
import com.varol.WellPass_Mananagement_System.service.notification.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${app.password-reset.token-validity-hours:24}")
    private int tokenValidityHours;

    @Override
    @Transactional
    public void sendPasswordResetEmail(String email) {
        log.info("Processing password reset request for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        tokenRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(tokenValidityHours);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(expiryDate);
        resetToken.setUsed(false);

        tokenRepository.save(resetToken);

        String resetLink = frontendUrl + "/reset-password?token=" + token;
        sendPasswordResetEmailToUser(user.getEmail(), user.getFullName(), resetLink, tokenValidityHours);

        log.info("Password reset email sent successfully to: {}", email);
    }

    @Override
    @Transactional
    public void resetPassword(String token, String newPassword) {
        log.info("Processing password reset with token");

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired reset token"));

        if (resetToken.isUsed()) {
            throw new IllegalStateException("Reset token has already been used");
        }

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Reset token has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        log.info("Password reset successfully for user: {}", user.getEmail());
    }

    @Override
    public boolean validateResetToken(String token) {
        return tokenRepository.findByToken(token)
                .map(resetToken -> !resetToken.isUsed() &&
                        resetToken.getExpiryDate().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    private void sendPasswordResetEmailToUser(String email, String fullName, String resetLink, int expiryHours) {
        try {
            String template = loadEmailTemplate();
            String htmlContent = template
                    .replace("{{fullName}}", fullName)
                    .replace("{{resetLink}}", resetLink)
                    .replace("{{expiryHours}}", String.valueOf(expiryHours));

            emailService.sendHtmlEmail(email, "Reset Your Password - WellPass", htmlContent);
        } catch (Exception e) {
            log.error("Failed to send password reset email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    private String loadEmailTemplate() throws IOException {
        String templatePath = "src/main/resources/templates/email/password-reset.html";
        return new String(Files.readAllBytes(Paths.get(templatePath)), StandardCharsets.UTF_8);
    }

    @Transactional
    public void cleanupExpiredTokens() {
        tokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
        log.info("Cleaned up expired password reset tokens");
    }
}