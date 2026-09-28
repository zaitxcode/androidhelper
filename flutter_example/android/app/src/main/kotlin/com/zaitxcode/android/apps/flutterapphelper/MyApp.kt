package com.zaitxcode.android.apps.flutterapphelper

import android.app.Application
import com.zaitxcode.android.core.apphelper.AppHelper

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        AppHelper.initialize(this)
    }
}
