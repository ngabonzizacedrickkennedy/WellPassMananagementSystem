package com.varol.WellPass_Mananagement_System.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.varol.WellPass_Mananagement_System.service.verification.OTPService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OTPCleanupScheduler {

    private final OTPService otpService;

    @Scheduled(cron = "0 */10 * * * ?")
    public void cleanupExpiredOTPs() {
        log.info("Starting OTP cleanup job");

        try {
            otpService.cleanupExpiredOTPs();
            log.info("OTP cleanup completed successfully");
        } catch (Exception e) {
            log.error("Error during OTP cleanup", e);
        }
    }

    @Scheduled(cron = "0 0 3 * * ?")
    public void deleteOldOTPs() {
        log.info("Starting old OTP deletion job");

        try {
            otpService.cleanupExpiredOTPs();
            log.info("Old OTP deletion completed successfully");
        } catch (Exception e) {
            log.error("Error deleting old OTPs", e);
        }
    }
}