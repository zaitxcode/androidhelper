# ============================================================
# AndroidHelper Demo App - R8 / ProGuard rules
# ============================================================

# Components referenced by name from the AndroidManifest.
-keep class com.zaitxcode.android.apps.apphelper.MainActivity { *; }
-keep class com.zaitxcode.android.apps.apphelper.ExampleApplication { *; }
-keep class com.zaitxcode.android.apps.apphelper.javaexample.JavaExampleActivity { *; }

# Java interop sample sources (documented public surface).
-keep class com.zaitxcode.android.apps.apphelper.javaexample.** { *; }

# AndroidHelper library public API (defensive, mirrors consumer rules).
-keep class com.zaitxcode.android.** {
    public <methods>;
    public <fields>;
}
-keepclassmembers class com.zaitxcode.android.** {
    public static final *** INSTANCE;
}

# Kotlin runtime support.
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**

# AndroidX FileProvider.
-keep class androidx.core.content.FileProvider { *; }
-keep class androidx.core.content.FileProvider$* { *; }

# Miuix (Xiaomi HyperOS design system).
-keep class top.yukonga.miuix.** { *; }
-dontwarn top.yukonga.miuix.**

# Jetpack Compose.
-dontwarn androidx.compose.**
