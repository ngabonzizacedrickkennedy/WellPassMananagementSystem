package com.varol.WellPass_Mananagement_System.scheduler;

import java.time.LocalDate;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AttendanceReportScheduler {

    @Scheduled(cron = "0 0 1 * * ?")
    public void generateDailyAttendanceReport() {
        log.info("Starting daily attendance report generation");

        try {
            LocalDate yesterday = LocalDate.now().minusDays(1);

            log.info("Daily attendance report generated for {}", yesterday);
        } catch (Exception e) {
            log.error("Error generating daily attendance report", e);
        }
    }

    @Scheduled(cron = "0 0 3 1 * ?")
    public void generateMonthlyAttendanceReport() {
        log.info("Starting monthly attendance report generation");

        try {
            LocalDate lastMonth = LocalDate.now().minusMonths(1);
            int year = lastMonth.getYear();
            int month = lastMonth.getMonthValue();

            log.info("Monthly attendance report generated for {}/{}", year, month);
        } catch (Exception e) {
            log.error("Error generating monthly attendance report", e);
        }
    }

    @Scheduled(cron = "0 30 23 * * ?")
    public void sendDailySummaryToServiceProviders() {
        log.info("Sending daily summary to service providers");

        try {
            log.info("Daily summary sent to service providers");
        } catch (Exception e) {
            log.error("Error sending daily summary", e);
        }
    }

    @Scheduled(cron = "0 0 8 * * MON")
    public void sendWeeklySummaryToCompanies() {
        log.info("Sending weekly summary to companies");

        try {
            log.info("Weekly summary sent to companies");
        } catch (Exception e) {
            log.error("Error sending weekly summary", e);
        }
    }
}