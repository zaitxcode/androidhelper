package com.zaitxcode.android.hardware

import android.content.Context
import android.content.res.Configuration
import com.zaitxcode.android.core.AppHelper

object Display {

    @JvmStatic
    @JvmOverloads
    fun isPortrait(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return context.resources.configuration.orientation == Configuration.ORIENTATION_PORTRAIT
    }

    @JvmStatic
    @JvmOverloads
    fun isLandscape(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        return context.resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
    }

    @JvmStatic
    @JvmOverloads
    fun getScreenWidthDp(context: Context = AppHelper.ctx()): Int {
        AppHelper.checkInitialized()
        return context.resources.configuration.screenWidthDp
    }

    @JvmStatic
    @JvmOverloads
    fun getScreenHeightDp(context: Context = AppHelper.ctx()): Int {
        AppHelper.checkInitialized()
        return context.resources.configuration.screenHeightDp
    }

    @JvmStatic
    @JvmOverloads
    fun getScreenDensity(context: Context = AppHelper.ctx()): Float {
        AppHelper.checkInitialized()
        return context.resources.displayMetrics.density
    }

    @JvmStatic
    @JvmOverloads
    fun dpToPx(dp: Float, context: Context = AppHelper.ctx()): Float {
        AppHelper.checkInitialized()
        return dp * getScreenDensity(context)
    }

    @JvmStatic
    @JvmOverloads
    fun pxToDp(px: Float, context: Context = AppHelper.ctx()): Float {
        AppHelper.checkInitialized()
        val density = getScreenDensity(context)
        return if (density > 0) px / density else px
    }
}
