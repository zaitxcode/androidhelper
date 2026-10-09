package com.zaitxcode.android.util

import com.zaitxcode.android.core.AppHelper
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.concurrent.TimeUnit

object Time {

    @JvmStatic fun now(): Long {
        AppHelper.checkInitialized()
        return System.currentTimeMillis()
    }

    @JvmStatic
    @JvmOverloads
    fun format(
        millis: Long,
        pattern: String,
        locale: Locale = Locale.getDefault()
    ): String {
        AppHelper.checkInitialized()
        return SimpleDateFormat(pattern, locale).format(Date(millis))
    }

    @JvmStatic
    @JvmOverloads
    fun parse(
        date: String,
        pattern: String,
        locale: Locale = Locale.getDefault()
    ): Long? {
        AppHelper.checkInitialized()
        return try {
            SimpleDateFormat(pattern, locale).parse(date)?.time
        } catch (_: Exception) {
            null
        }
    }

    @JvmStatic fun timeAgo(millis: Long): String {
        AppHelper.checkInitialized()
        val diff = now() - millis

        return when {
            diff < TimeUnit.MINUTES.toMillis(1) -> "Just now"
            diff < TimeUnit.HOURS.toMillis(1) -> "${TimeUnit.MILLISECONDS.toMinutes(diff)} minutes ago"
            diff < TimeUnit.DAYS.toMillis(1) -> "${TimeUnit.MILLISECONDS.toHours(diff)} hours ago"
            else -> "${TimeUnit.MILLISECONDS.toDays(diff)} days ago"
        }
    }

    @JvmStatic fun isToday(millis: Long): Boolean {
        AppHelper.checkInitialized()
        val c1 = Calendar.getInstance().apply { timeInMillis = millis }
        val c2 = Calendar.getInstance().apply { timeInMillis = now() }
        return c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR) &&
            c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR)
    }

    @JvmStatic fun isYesterday(millis: Long): Boolean {
        AppHelper.checkInitialized()
        val c1 = Calendar.getInstance().apply { timeInMillis = millis }
        val c2 = Calendar.getInstance().apply { timeInMillis = now() - TimeUnit.DAYS.toMillis(1) }
        return c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR) &&
            c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR)
    }

    @JvmStatic fun isTomorrow(millis: Long): Boolean {
        AppHelper.checkInitialized()
        val c1 = Calendar.getInstance().apply { timeInMillis = millis }
        val c2 = Calendar.getInstance().apply { timeInMillis = now() + TimeUnit.DAYS.toMillis(1) }
        return c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR) &&
            c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR)
    }

    @JvmStatic
    @JvmOverloads
    fun startOfDay(millis: Long = now()): Long {
        AppHelper.checkInitialized()
        return Calendar.getInstance().apply {
            timeInMillis = millis
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }.timeInMillis
    }

    @JvmStatic
    @JvmOverloads
    fun endOfDay(millis: Long = now()): Long {
        AppHelper.checkInitialized()
        return Calendar.getInstance().apply {
            timeInMillis = millis
            set(Calendar.HOUR_OF_DAY, 23)
            set(Calendar.MINUTE, 59)
            set(Calendar.SECOND, 59)
            set(Calendar.MILLISECOND, 999)
        }.timeInMillis
    }

    @JvmStatic fun isLeapYear(year: Int): Boolean {
        AppHelper.checkInitialized()
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
    }

    @JvmStatic fun getDaysInMonth(year: Int, month: Int): Int {
        AppHelper.checkInitialized()
        val cal = Calendar.getInstance()
        cal.set(Calendar.YEAR, year)
        cal.set(Calendar.MONTH, month - 1)
        return cal.getActualMaximum(Calendar.DAY_OF_MONTH)
    }

    @JvmStatic fun formatDuration(seconds: Long): String {
        AppHelper.checkInitialized()
        val hrs = seconds / 3600
        val mins = (seconds % 3600) / 60
        val secs = seconds % 60
        return if (hrs > 0) {
            String.format(Locale.US, "%02d:%02d:%02d", hrs, mins, secs)
        } else {
            String.format(Locale.US, "%02d:%02d", mins, secs)
        }
    }
}
