package com.zaitxcode.android.content

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import com.zaitxcode.android.core.AppHelper

object Clipboard {

    private const val CLIP_LABEL = "App"

    @JvmStatic
    @JvmOverloads
    fun copyText(text: String, context: Context = AppHelper.ctx()) {
        AppHelper.checkInitialized()
        val clipboard =
            context.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager ?: return

        val clip = ClipData.newPlainText(CLIP_LABEL, text)
        clipboard.setPrimaryClip(clip)
    }

    @JvmStatic
    @JvmOverloads
    fun getText(context: Context = AppHelper.ctx()): String? {
        AppHelper.checkInitialized()
        val clipboard =
            context.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager ?: return null

        if (!clipboard.hasPrimaryClip()) return null

        val clip = clipboard.primaryClip ?: return null
        if (clip.itemCount == 0) return null

        return clip.getItemAt(0).coerceToText(context)?.toString()
    }

    @JvmStatic
    @JvmOverloads
    fun hasCopiedText(context: Context = AppHelper.ctx()): Boolean {
        AppHelper.checkInitialized()
        val clipboard =
            context.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager ?: return false
        return clipboard.hasPrimaryClip() && (clipboard.primaryClip?.itemCount ?: 0) > 0
    }

    @JvmStatic
    @JvmOverloads
    fun clear(context: Context = AppHelper.ctx()) {
        AppHelper.checkInitialized()
        val clipboard =
            context.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager ?: return

        clipboard.setPrimaryClip(ClipData.newPlainText(CLIP_LABEL, ""))
    }
}
