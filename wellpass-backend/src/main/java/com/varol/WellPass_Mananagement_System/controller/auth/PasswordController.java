package com.varol.WellPass_Mananagement_System.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.varol.WellPass_Mananagement_System.dtos.request.auth.ForgotPasswordRequest;
import com.varol.WellPass_Mananagement_System.dtos.request.auth.ResetPasswordRequest;
import com.varol.WellPass_Mananagement_System.dtos.response.common.ApiResponse;
import com.varol.WellPass_Mananagement_System.service.auth.PasswordResetService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/password")
@RequiredArgsConstructor
@Slf4j
public class PasswordController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        log.info("Password reset request received for email: {}", request.getEmail());

        passwordResetService.sendPasswordResetEmail(request.getEmail());

        return ResponseEntity.ok(ApiResponse.success(
                "If an account exists with this email, a password reset link has been sent",
                null
        ));
    }

    @PostMapping("/reset")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info("Password reset confirmation received");

        passwordResetService.resetPassword(request.getResetToken(), request.getNewPassword());

        return ResponseEntity.ok(ApiResponse.success("Password reset successfully", null));
    }
}