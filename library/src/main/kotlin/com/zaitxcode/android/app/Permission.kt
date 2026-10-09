package com.zaitxcode.android.app

import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.zaitxcode.android.core.AppHelper

object Permission {

    @JvmStatic
    @JvmOverloads
    fun isGranted(permission: String, context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return ContextCompat.checkSelfPermission(
            context,
            permission
        ) == PackageManager.PERMISSION_GRANTED
    }

    @JvmStatic
    @JvmOverloads
    fun areGranted(permissions: Array<String>, context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return permissions.all { isGranted(it, context) }
    }

    @JvmStatic
    @JvmOverloads
    fun deniedPermissions(permissions: Array<String>, context: Context = AppHelper.ctx()): List<String> {
        AppHelper.checkInitialized()
        return permissions.filter { !isGranted(it, context) }
    }

    @JvmStatic
    fun shouldShowRationale(activity: Activity, permission: String): Boolean {
        AppHelper.checkInitialized()
        return ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)
    }

    @JvmStatic
    fun request(activity: Activity, permission: String, requestCode: Int) {
        AppHelper.checkInitialized()
        ActivityCompat.requestPermissions(activity, arrayOf(permission), requestCode)
    }

    @JvmStatic
    fun requestMultiple(activity: Activity, permissions: Array<String>, requestCode: Int) {
        AppHelper.checkInitialized()
        ActivityCompat.requestPermissions(activity, permissions, requestCode)
    }
}
