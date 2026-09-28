package com.zaitxcode.android.hardware

import android.content.Context
import android.content.res.Configuration
import com.zaitxcode.android.core.AppHelper

object Display {

    fun isPortrait(context: Context = AppHelper.ctx()): Boolean {
        return context.resources.configuration.orientation == Configuration.ORIENTATION_PORTRAIT
    }

    fun isLandscape(context: Context = AppHelper.ctx()): Boolean {
        return context.resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
    }

    fun getScreenWidthDp(context: Context = AppHelper.ctx()): Int {
        return context.resources.configuration.screenWidthDp
    }

    fun getScreenHeightDp(context: Context = AppHelper.ctx()): Int {
        return context.resources.configuration.screenHeightDp
    }

    fun getScreenDensity(context: Context = AppHelper.ctx()): Float {
        return context.resources.displayMetrics.density
    }

    fun dpToPx(dp: Float, context: Context = AppHelper.ctx()): Float {
        return dp * getScreenDensity(context)
    }

    fun pxToDp(px: Float, context: Context = AppHelper.ctx()): Float {
        val density = getScreenDensity(context)
        return if (density > 0) px / density else px
    }
}
