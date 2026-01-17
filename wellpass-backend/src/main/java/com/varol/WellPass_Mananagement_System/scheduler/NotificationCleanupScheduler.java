package com.varol.WellPass_Mananagement_System.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.varol.WellPass_Mananagement_System.service.notification.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationCleanupScheduler {

    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 4 * * ?")
    public void cleanupOldNotifications() {
        log.info("Starting notification cleanup job");

        try {
            notificationService.deleteOldNotifications();
            log.info("Notification cleanup completed successfully");
        } catch (Exception e) {
            log.error("Error during notification cleanup", e);
        }
    }

    @Scheduled(cron = "0 0 */6 * * ?")
    public void archiveReadNotifications() {
        log.info("Archiving old read notifications");

        try {
            log.info("Read notifications archived successfully");
        } catch (Exception e) {
            log.error("Error archiving read notifications", e);
        }
    }
}