package com.zaitxcode.android.view

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.view.WindowManager
import com.zaitxcode.android.core.AppHelper

object Screen {

    private fun Context.getActivity(): Activity? {
        var ctx = this
        while (ctx is ContextWrapper) {
            if (ctx is Activity) return ctx
            ctx = ctx.baseContext
        }
        return null
    }

    private fun Activity.hasSecureFlag(): Boolean {
        return (window.attributes.flags and WindowManager.LayoutParams.FLAG_SECURE) != 0
    }

    private fun applySecureFlag(activity: Activity, enable: Boolean) {
        val hasFlag = activity.hasSecureFlag()
        if (enable && !hasFlag) {
            activity.window.setFlags(
                WindowManager.LayoutParams.FLAG_SECURE,
                WindowManager.LayoutParams.FLAG_SECURE
            )
        } else if (!enable && hasFlag) {
            activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        }
    }

    @JvmStatic
    @JvmOverloads
    fun blockCapture(context: Context = AppHelper.ctx()) {
        AppHelper.checkInitialized()
        val activity = AppHelper.act() ?: context.getActivity()
        activity?.let { applySecureFlag(it, true) }
    }

    @JvmStatic
    @JvmOverloads
    fun unblockCapture(context: Context = AppHelper.ctx()) {
        AppHelper.checkInitialized()
        val activity = AppHelper.act() ?: context.getActivity()
        activity?.let { applySecureFlag(it, false) }
    }

    @JvmStatic
    @JvmOverloads
    fun isCaptureBlocked(activity: Activity? = AppHelper.act()): Boolean {
        AppHelper.checkInitialized()
        return activity?.hasSecureFlag() == true
    }
}
