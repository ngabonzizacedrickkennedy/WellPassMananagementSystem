package com.varol.WellPass_Mananagement_System.util;

import java.util.UUID;

public class StringUtil {

    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    public static String capitalize(String str) {
        if (isEmpty(str)) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }

    public static String capitalizeWords(String str) {
        if (isEmpty(str)) return str;
        String[] words = str.split("\\s+");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (result.length() > 0) result.append(" ");
            result.append(capitalize(word));
        }
        return result.toString();
    }

    public static String generateUniqueCode(String prefix) {
        return prefix + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public static String truncate(String str, int maxLength) {
        if (str == null) return null;
        if (str.length() <= maxLength) return str;
        return str.substring(0, maxLength - 3) + "...";
    }

    public static String sanitize(String str) {
        if (str == null) return null;
        return str.trim().replaceAll("\\s+", " ");
    }

    public static String mask(String str, int visibleChars) {
        if (isEmpty(str)) return str;
        if (str.length() <= visibleChars) return str;
        return str.substring(0, visibleChars) + "*".repeat(str.length() - visibleChars);
    }
}