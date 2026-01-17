package com.varol.WellPass_Mananagement_System.implementation.notification;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.varol.WellPass_Mananagement_System.service.notification.SMSService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SMSServiceImpl implements SMSService {

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @Override
    public void sendSMS(String phoneNumber, String message) {
        try {
            Message twilioMessage = Message.creator(
                    new PhoneNumber(phoneNumber),
                    new PhoneNumber(twilioPhoneNumber),
                    message
            ).create();

            log.info("SMS sent successfully to {}: SID={}", phoneNumber, twilioMessage.getSid());
        } catch (Exception e) {
            log.error("Failed to send SMS to {}: {}", phoneNumber, e.getMessage(), e);
            throw new RuntimeException("Failed to send SMS", e);
        }
    }

    @Override
    public void sendOTPSMS(String phoneNumber, String otpCode) {
        String message = String.format(
                "FitLife Wellness Access\n\nYour verification code: %s\nValid for 3 minutes only.\n\nDo not share this code.",
                otpCode
        );
        sendSMS(phoneNumber, message);
    }

    @Override
    public void sendAdmissionConfirmationSMS(String phoneNumber, String employeeName, String serviceName, String time) {
        String message = String.format(
                "FitLife Wellness\n\n✓ Access Confirmed!\n\nService: %s\nTime: %s\n\nEnjoy your workout!",
                serviceName,
                time
        );
        sendSMS(phoneNumber, message);
    }
}