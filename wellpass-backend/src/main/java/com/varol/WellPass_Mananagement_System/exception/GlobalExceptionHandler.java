package com.varol.WellPass_Mananagement_System.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.varol.WellPass_Mananagement_System.dtos.response.common.ErrorResponse;
import com.varol.WellPass_Mananagement_System.exception.custom.DuplicateEmployeeException;
import com.varol.WellPass_Mananagement_System.exception.custom.DuplicateResourceException;
import com.varol.WellPass_Mananagement_System.exception.custom.EmployeeNotFoundException;
import com.varol.WellPass_Mananagement_System.exception.custom.ExpiredOTPException;
import com.varol.WellPass_Mananagement_System.exception.custom.FileStorageException;
import com.varol.WellPass_Mananagement_System.exception.custom.InvalidCredentialsException;
import com.varol.WellPass_Mananagement_System.exception.custom.InvalidOTPException;
import com.varol.WellPass_Mananagement_System.exception.custom.InvoiceGenerationException;
import com.varol.WellPass_Mananagement_System.exception.custom.ResourceNotFoundException;
import com.varol.WellPass_Mananagement_System.exception.custom.ServiceNotAvailableException;
import com.varol.WellPass_Mananagement_System.exception.custom.UnauthorizedException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.RESOURCE_NOT_FOUND.getCode());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResource(DuplicateResourceException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.DUPLICATE_RESOURCE.getCode());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentials(InvalidCredentialsException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.INVALID_CREDENTIALS.getCode());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.UNAUTHORIZED.getCode());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.AUTHENTICATION_FAILED.getCode());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidOTPException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOTP(InvalidOTPException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.INVALID_OTP.getCode());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExpiredOTPException.class)
    public ResponseEntity<ErrorResponse> handleExpiredOTP(ExpiredOTPException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.EXPIRED_OTP.getCode());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEmployeeNotFound(EmployeeNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.EMPLOYEE_NOT_FOUND.getCode());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateEmployeeException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateEmployee(DuplicateEmployeeException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.DUPLICATE_EMPLOYEE.getCode());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ServiceNotAvailableException.class)
    public ResponseEntity<ErrorResponse> handleServiceNotAvailable(ServiceNotAvailableException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.SERVICE_NOT_AVAILABLE.getCode());
        return new ResponseEntity<>(error, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ErrorResponse> handleFileStorage(FileStorageException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.FILE_STORAGE_ERROR.getCode());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvoiceGenerationException.class)
    public ResponseEntity<ErrorResponse> handleInvoiceGeneration(InvoiceGenerationException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), ErrorCode.INVOICE_GENERATION_ERROR.getCode());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> {
                    if (error instanceof FieldError) {
                        return ((FieldError) error).getField() + ": " + error.getDefaultMessage();
                    }
                    return error.getDefaultMessage();
                })
                .collect(Collectors.toList());

        ErrorResponse error = new ErrorResponse("Validation failed", ErrorCode.VALIDATION_ERROR.getCode(), errors);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse("An unexpected error occurred", ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}