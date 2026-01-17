package com.varol.WellPass_Mananagement_System.validation.validator;

import com.varol.WellPass_Mananagement_System.validation.annotation.ValidPhoneNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {

    private static final String PHONE_PATTERN = "^\\+?[1-9]\\d{9,14}$";

    @Override
    public void initialize(ValidPhoneNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return true;
        }

        String cleaned = phoneNumber.replaceAll("[^0-9+]", "");
        return cleaned.matches(PHONE_PATTERN);
    }
}