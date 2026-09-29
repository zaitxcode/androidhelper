package com.zaitxcode.android.apps.apphelper;

import android.content.Context;
import com.zaitxcode.android.core.AppHelper;
import com.zaitxcode.android.net.Network;
import com.zaitxcode.android.hardware.Audio;
import com.zaitxcode.android.hardware.Vibration;
import com.zaitxcode.android.content.Clipboard;
import com.zaitxcode.android.hardware.Device;
import com.zaitxcode.android.hardware.Battery;
import com.zaitxcode.android.security.Encryption;
import com.zaitxcode.android.util.Validation;

public class JavaSampleTest {

    public static void testJavaCalls(Context context) {
        AppHelper.initialize(context);
        AppHelper.log("JavaSample", "Testing Java Interop");

        boolean online = Network.isConnected();
        String transport = Network.activeTransport();

        Audio.playClickSound();
        Vibration.vibrate(200);

        Clipboard.copyText("Java Test");
        String text = Clipboard.getText();

        String name = Device.deviceName();
        int battery = Battery.getBatteryLevel();

        String hash = Encryption.sha256("password");
        boolean validEmail = Validation.isValidEmail("user@example.com");

        AppHelper.log("JavaSample", "Java calls verified successfully: " + online + ", " + name);
    }
}
