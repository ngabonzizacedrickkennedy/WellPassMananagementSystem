package com.varol.WellPass_Mananagement_System.validation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.varol.WellPass_Mananagement_System.validation.validator.FileTypeValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FileTypeValidator.class)
public @interface ValidFileType {

    String message() default "Invalid file type";

    String[] allowedTypes() default {};

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}