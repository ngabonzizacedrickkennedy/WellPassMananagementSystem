package com.varol.WellPass_Mananagement_System.util.messaging;

import java.util.Map;

public class EmailTemplateBuilder {

    public static String buildOTPEmailTemplate(String recipientName, String otpCode, int expiryMinutes) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>WellPass OTP Verification</h2>
                <p>Hello %s,</p>
                <p>Your verification code is:</p>
                <h1 style="color: #4CAF50;">%s</h1>
                <p>This code will expire in %d minutes.</p>
                <p>If you did not request this code, please ignore this email.</p>
                <br>
                <p>Best regards,<br>WellPass Team</p>
            </body>
            </html>
            """, recipientName, otpCode, expiryMinutes);
    }

    public static String buildWelcomeEmailTemplate(String employeeName, String companyName) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>Welcome to WellPass!</h2>
                <p>Hello %s,</p>
                <p>Welcome to WellPass, provided by %s.</p>
                <p>You now have access to wellness and fitness services through your company benefits.</p>
                <p>To get started, download the WellPass mobile app or visit our website.</p>
                <br>
                <p>Best regards,<br>WellPass Team</p>
            </body>
            </html>
            """, employeeName, companyName);
    }

    public static String buildInvoiceEmailTemplate(String companyName, String invoiceNumber, String amount, String dueDate) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>New Invoice Generated</h2>
                <p>Dear %s,</p>
                <p>A new invoice has been generated for your account.</p>
                <ul>
                    <li><strong>Invoice Number:</strong> %s</li>
                    <li><strong>Amount:</strong> $%s</li>
                    <li><strong>Due Date:</strong> %s</li>
                </ul>
                <p>Please log in to your account to view and download the invoice.</p>
                <br>
                <p>Best regards,<br>WellPass Team</p>
            </body>
            </html>
            """, companyName, invoiceNumber, amount, dueDate);
    }

    public static String buildCustomTemplate(String template, Map<String, String> variables) {
        String result = template;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return result;
    }
}