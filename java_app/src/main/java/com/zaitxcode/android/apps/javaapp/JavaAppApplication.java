package com.zaitxcode.android.apps.javaapp;

import android.app.Application;

import com.zaitxcode.android.core.AppHelper;

/**
 * Application class for the Java demo app.
 *
 * <p>Initializes the AndroidHelper library once at process start so that every
 * helper can be called later without passing a Context explicitly.</p>
 */
public class JavaAppApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        AppHelper.initialize(this);
    }
}
