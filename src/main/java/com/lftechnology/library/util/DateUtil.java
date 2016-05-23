
package com.lftechnology.library.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.joda.time.DateTime;

public class DateUtil {

    private final static String SQL_DATE_PATTERN = "yyyy-MM-dd HH:mm";

    public static String formatDateToSqlDateString(LocalDateTime localDateTime) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(SQL_DATE_PATTERN);
        return localDateTime.format(dateTimeFormatter);
    }

    public static String getCurrentDateWithTimeStamp() {
        return new DateTime().toString();
    }

    public static LocalDateTime getLocalDateTimeFromMilliSeconds(long milliSeconds) {
        Instant instant = Instant.ofEpochMilli(milliSeconds);
        return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    }

    public static LocalDateTime getLocalDateTimeFromSeconds(long seconds) {
        Instant instant = Instant.ofEpochSecond(seconds);
        return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    }

    public static void main(String[] args) {
        System.out.println(
            DateUtil.getLocalDateTimeFromSeconds(LocalDateTime.now().plusMinutes(10).atZone(ZoneId.systemDefault()).toEpochSecond()));
    }
}
