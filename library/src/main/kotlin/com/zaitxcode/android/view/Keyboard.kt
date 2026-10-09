package com.zaitxcode.android.view

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.os.Build
import android.view.View
import android.view.WindowInsets
import android.view.inputmethod.InputMethodManager
import com.zaitxcode.android.core.AppHelper

object Keyboard {

    private fun Context.getActivity(): Activity? {
        var ctx = this
        while (ctx is ContextWrapper) {
            if (ctx is Activity) return ctx
            ctx = ctx.baseContext
        }
        return null
    }

    @JvmStatic
    @JvmOverloads
    fun hideKeyboard(context: Context = AppHelper.ctx()) {
        AppHelper.checkInitialized()
        val activity = AppHelper.act() ?: context.getActivity()
        val view = activity?.currentFocus ?: View(context)
        val imm =
            context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    @JvmStatic
    fun hideKeyboard(view: View) {
        AppHelper.checkInitialized()
        val imm =
            view.context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    @JvmStatic
    fun showKeyboard(view: View) {
        AppHelper.checkInitialized()
        view.requestFocus()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            view.windowInsetsController?.show(WindowInsets.Type.ime())
        } else {
            showKeyboardLegacy(view)
        }
    }

    @JvmStatic
    fun isKeyboardOpen(view: View): Boolean {
        AppHelper.checkInitialized()
        val imm =
            view.context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        return imm.isActive(view)
    }

    @Suppress("DEPRECATION")
    private fun showKeyboardLegacy(view: View) {
        val imm =
            view.context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
    }
}
