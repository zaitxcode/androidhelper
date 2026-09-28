package com.zaitxcode.android.apps.apphelper

import android.app.Application
import com.zaitxcode.android.core.apphelper.AppHelper

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        AppHelper.initialize(this)
    }
}
