package com.varol.WellPass_Mananagement_System.config.messaging;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.twilio.Twilio;

@Configuration
public class SMSConfig {

    @Value("${twilio.account.sid:}")
    private String accountSid;

    @Value("${twilio.auth.token:}")
    private String authToken;

    @Value("${twilio.phone.number:}")
    private String phoneNumber;

    @Bean
    public String twilioPhoneNumber() {
        return phoneNumber;
    }

    @Bean
    public String initializeTwilio() {
        if (!accountSid.isEmpty() && !authToken.isEmpty()) {
            Twilio.init(accountSid, authToken);
            return "Twilio initialized";

        }
        return "twilio not initialized";
    }
}