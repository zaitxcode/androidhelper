package com.zaitxcode.android.app

import android.app.ActivityManager
import android.content.Context
import android.os.PowerManager
import com.zaitxcode.android.core.AppHelper

object AppState {

    @JvmStatic
    @JvmOverloads
    fun isAppInForeground(context: Context = AppHelper.ctx()): Boolean {
        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as? ActivityManager
            ?: return false
        val processes = am.runningAppProcesses ?: return false

        return processes.any {
            it.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                it.processName == context.packageName
        }
    }

    @JvmStatic @JvmOverloads fun isAppInBackground(context: Context = AppHelper.ctx()): Boolean = !isAppInForeground(context)

    @JvmStatic
    @JvmOverloads
    fun isScreenOn(context: Context = AppHelper.ctx()): Boolean {
        val pm = context.getSystemService(Context.POWER_SERVICE) as? PowerManager
        return pm?.isInteractive == true
    }

    @JvmStatic
    @JvmOverloads
    fun isLowRamDevice(context: Context = AppHelper.ctx()): Boolean {
        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as? ActivityManager
        return am?.isLowRamDevice == true
    }

    @JvmStatic
    @JvmOverloads
    fun isIgnoringBatteryOptimizations(context: Context = AppHelper.ctx()): Boolean {
        val pm = context.getSystemService(Context.POWER_SERVICE) as? PowerManager
        return pm?.isIgnoringBatteryOptimizations(context.packageName) == true
    }
}
