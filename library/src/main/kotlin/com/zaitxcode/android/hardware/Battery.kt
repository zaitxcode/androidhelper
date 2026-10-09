package com.zaitxcode.android.hardware

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.PowerManager
import com.zaitxcode.android.core.AppHelper

object Battery {

    private fun getBatteryIntent(context: Context): Intent? {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        return context.registerReceiver(null, filter)
    }

    @JvmStatic
    @JvmOverloads
    fun getBatteryLevel(context: Context = AppHelper.ctx()): Int {
        AppHelper.checkInitialized()
        val intent = getBatteryIntent(context) ?: return -1
        val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
        val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)

        if (level < 0 || scale <= 0) return -1

        return ((level.toFloat() / scale.toFloat()) * 100).toInt()
    }

    @JvmStatic
    @JvmOverloads
    fun isCharging(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        val intent = getBatteryIntent(context) ?: return false
        val status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)

        return status == BatteryManager.BATTERY_STATUS_CHARGING ||
            status == BatteryManager.BATTERY_STATUS_FULL
    }

    @JvmStatic
    @JvmOverloads
    fun getChargingType(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        val intent = getBatteryIntent(context) ?: return "NONE"
        val plugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1)

        return when (plugged) {
            BatteryManager.BATTERY_PLUGGED_AC -> "AC"
            BatteryManager.BATTERY_PLUGGED_USB -> "USB"
            BatteryManager.BATTERY_PLUGGED_WIRELESS -> "WIRELESS"
            else -> "NONE"
        }
    }

    @JvmStatic
    @JvmOverloads
    fun getBatteryStatus(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        val intent = getBatteryIntent(context) ?: return "UNKNOWN"

        return when (intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)) {
            BatteryManager.BATTERY_STATUS_CHARGING -> "CHARGING"
            BatteryManager.BATTERY_STATUS_DISCHARGING -> "DISCHARGING"
            BatteryManager.BATTERY_STATUS_FULL -> "FULL"
            BatteryManager.BATTERY_STATUS_NOT_CHARGING -> "NOT_CHARGING"
            else -> "UNKNOWN"
        }
    }

    @JvmStatic
    @JvmOverloads
    fun getBatteryHealth(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        val intent = getBatteryIntent(context) ?: return "UNKNOWN"

        return when (intent.getIntExtra(BatteryManager.EXTRA_HEALTH, -1)) {
            BatteryManager.BATTERY_HEALTH_GOOD -> "GOOD"
            BatteryManager.BATTERY_HEALTH_OVERHEAT -> "OVERHEAT"
            BatteryManager.BATTERY_HEALTH_DEAD -> "DEAD"
            BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE -> "OVER_VOLTAGE"
            BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE -> "UNSPECIFIED_FAILURE"
            BatteryManager.BATTERY_HEALTH_COLD -> "COLD"
            else -> "UNKNOWN"
        }
    }

    @JvmStatic
    @JvmOverloads
    fun isPowerSaveMode(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        val pm = context.getSystemService(Context.POWER_SERVICE) as? PowerManager
        return pm?.isPowerSaveMode == true
    }
}
