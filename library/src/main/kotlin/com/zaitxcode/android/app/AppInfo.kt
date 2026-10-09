package com.zaitxcode.android.app

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Build
import com.zaitxcode.android.core.AppHelper

object AppInfo {

    @JvmStatic
    @JvmOverloads
    fun packageName(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        return context.packageName
    }

    @JvmStatic
    @JvmOverloads
    fun appName(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        return try {
            val appInfo = context.packageManager.getApplicationInfo(context.packageName, 0)
            context.packageManager.getApplicationLabel(appInfo).toString()
        } catch (_: Exception) {
            context.packageName
        }
    }

    @JvmStatic
    @JvmOverloads
    fun versionName(context: Context = AppHelper.ctx()): String {
        AppHelper.checkInitialized()
        return try {
            context.packageManager.getPackageInfo(context.packageName, 0).versionName ?: ""
        } catch (_: Exception) {
            ""
        }
    }

    @JvmStatic
    @JvmOverloads
    fun versionCode(context: Context = AppHelper.ctx()): Long {
        AppHelper.checkInitialized()
        return try {
            val info = context.packageManager.getPackageInfo(context.packageName, 0)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                info.longVersionCode
            } else {
                @Suppress("DEPRECATION")
                info.versionCode.toLong()
            }
        } catch (_: Exception) {
            -1L
        }
    }

    @JvmStatic
    @JvmOverloads
    fun installerPackageName(context: Context = AppHelper.ctx()): String? {
        AppHelper.checkInitialized()
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                context.packageManager.getInstallSourceInfo(context.packageName).installingPackageName
            } else {
                @Suppress("DEPRECATION")
                context.packageManager.getInstallerPackageName(context.packageName)
            }
        } catch (_: Exception) {
            null
        }
    }

    @JvmStatic
    @JvmOverloads
    fun isDebuggable(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return try {
            (context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0
        } catch (_: Exception) {
            false
        }
    }

    @JvmStatic
    @JvmOverloads
    fun isPackageInstalled(packageName: String, context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return try {
            context.packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
            true
        } catch (_: Exception) {
            false
        }
    }
}
