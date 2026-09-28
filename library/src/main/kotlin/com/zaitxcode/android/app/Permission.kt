package com.zaitxcode.android.app

import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.zaitxcode.android.core.AppHelper

object Permission {

    fun isGranted(permission: String, context: Context = AppHelper.ctx()): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            permission
        ) == PackageManager.PERMISSION_GRANTED
    }

    fun areGranted(permissions: Array<String>, context: Context = AppHelper.ctx()): Boolean {
        return permissions.all { isGranted(it, context) }
    }

    fun deniedPermissions(permissions: Array<String>, context: Context = AppHelper.ctx()): List<String> {
        return permissions.filter { !isGranted(it, context) }
    }

    fun shouldShowRationale(activity: Activity, permission: String): Boolean {
        return ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)
    }

    fun request(activity: Activity, permission: String, requestCode: Int) {
        ActivityCompat.requestPermissions(activity, arrayOf(permission), requestCode)
    }

    fun requestMultiple(activity: Activity, permissions: Array<String>, requestCode: Int) {
        ActivityCompat.requestPermissions(activity, permissions, requestCode)
    }
}
