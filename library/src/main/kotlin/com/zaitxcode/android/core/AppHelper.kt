package com.zaitxcode.android.core

import android.app.Activity
import android.app.Application
import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AlertDialog
import com.zaitxcode.android.net.Network

object AppHelper {

    private var applicationContext: Context? = null
    private var currentActivity: Activity? = null
    private var isLifecycleRegistered = false

    @JvmStatic
    fun initialize(context: Context) {
        val appContext = context.applicationContext
        applicationContext = appContext

        if (context is Activity) {
            currentActivity = context
        }

        val app = appContext as? Application
        if (app != null && !isLifecycleRegistered) {
            registerLifecycle(app)
            isLifecycleRegistered = true
        }

        Network.initialize(appContext)
    }

    @JvmStatic
    fun initialize(activity: Activity) {
        currentActivity = activity
        initialize(activity as Context)
    }

    internal fun ctx(): Context {
        return applicationContext
            ?: currentActivity?.applicationContext
            ?: throw IllegalStateException("AppHelper must be initialized: AppHelper.initialize(context)")
    }

    internal fun act(): Activity? {
        return currentActivity
    }

    private fun registerLifecycle(app: Application) {
        app.registerActivityLifecycleCallbacks(object :
            Application.ActivityLifecycleCallbacks {
            override fun onActivityCreated(a: Activity, b: Bundle?) {
                currentActivity = a
            }

            override fun onActivityStarted(a: Activity) {
                currentActivity = a
            }

            override fun onActivityResumed(a: Activity) {
                currentActivity = a
            }

            override fun onActivityPaused(a: Activity) {}
            override fun onActivityStopped(a: Activity) {}
            override fun onActivitySaveInstanceState(a: Activity, b: Bundle) {}

            override fun onActivityDestroyed(a: Activity) {
                if (currentActivity == a) {
                    currentActivity = null
                }
            }
        })
    }

    @JvmStatic
    fun log(tag: String, message: String) = Log.d(tag, message)

    @JvmStatic
    fun logWarning(tag: String, message: String) = Log.w(tag, message)

    @JvmStatic
    @JvmOverloads
    fun logError(tag: String, message: String, throwable: Throwable? = null) {
        if (throwable != null) {
            Log.e(tag, message, throwable)
            showLogDialog("Error", tag, "$message\n\n${throwable.localizedMessage}")
        } else {
            Log.e(tag, message)
            showLogDialog("Error", tag, message)
        }
    }

    private fun showLogDialog(type: String, tag: String, message: String) {
        val activity = act() ?: return
        activity.runOnUiThread {
            AlertDialog.Builder(activity)
                .setTitle("$type : $tag")
                .setMessage(message)
                .setCancelable(true)
                .setPositiveButton("OK", null)
                .show()
        }
    }
}
