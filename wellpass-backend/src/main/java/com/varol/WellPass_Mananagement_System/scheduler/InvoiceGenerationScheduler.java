package com.varol.WellPass_Mananagement_System.scheduler;

import java.time.LocalDate;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.varol.WellPass_Mananagement_System.service.billing.InvoiceGenerationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class InvoiceGenerationScheduler {

    private final InvoiceGenerationService invoiceGenerationService;

    @Scheduled(cron = "0 0 2 1 * ?")
    public void generateMonthlyInvoices() {
        log.info("Starting monthly invoice generation job");

        try {
            LocalDate now = LocalDate.now();
            int previousMonth = now.minusMonths(1).getMonthValue();
            int year = now.minusMonths(1).getYear();

            invoiceGenerationService.generateAllMonthlyInvoices(year, previousMonth);

            log.info("Monthly invoice generation completed successfully for {}/{}", year, previousMonth);
        } catch (Exception e) {
            log.error("Error generating monthly invoices", e);
        }
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void checkOverdueInvoices() {
        log.info("Checking for overdue invoices");

        try {
            log.info("Overdue invoice check completed");
        } catch (Exception e) {
            log.error("Error checking overdue invoices", e);
        }
    }
}