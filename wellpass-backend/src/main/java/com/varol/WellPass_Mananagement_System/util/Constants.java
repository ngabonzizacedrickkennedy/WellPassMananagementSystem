package com.varol.WellPass_Mananagement_System.util;

public class Constants {

    public static final int OTP_LENGTH = 6;
    public static final int OTP_EXPIRY_MINUTES = 3;
    public static final int MAX_OTP_ATTEMPTS = 3;

    public static final int QR_CODE_WIDTH = 300;
    public static final int QR_CODE_HEIGHT = 300;

    public static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    public static final long MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    public static final int PROFILE_IMAGE_WIDTH = 200;
    public static final int PROFILE_IMAGE_HEIGHT = 200;

    public static final String DEFAULT_UPLOAD_DIR = "uploads/";
    public static final String PROFILE_UPLOAD_DIR = "uploads/profiles/";
    public static final String INVOICE_UPLOAD_DIR = "uploads/invoices/";

    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DISPLAY_DATE_FORMAT = "MMM dd, yyyy";

    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MAX_PAGE_SIZE = 100;

    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    public static final String JWT_HEADER_NAME = "Authorization";

    public static final int INVOICE_DAY_OF_MONTH = 1;
    public static final int INVOICE_DUE_DAYS = 30;

    public static final String EMAIL_FROM = "noreply@wellpass.com";
    public static final String EMAIL_FROM_NAME = "WellPass";

    private Constants() {
    }
}