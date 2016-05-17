
package com.lftechnology.library.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.joda.time.DateTime;

public class DateUtil {

    public static final DateFormat SQL_DATE_FORMAT_WITHOUT_TIME = new SimpleDateFormat("yyyy-MM-dd");

    public static String formatDateToSqlDateString(DateTime date) {
        return SQL_DATE_FORMAT_WITHOUT_TIME.format(date.toDate());
    }

    public static String getCurrentDateWithTimeStamp() {
        return new DateTime().toString();
    }

}
