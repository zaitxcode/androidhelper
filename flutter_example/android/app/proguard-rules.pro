# ============================================================
# AndroidHelper Flutter Demo - R8 / ProGuard rules
# ============================================================

# Components referenced by name from the AndroidManifest.
-keep class com.zaitxcode.android.apps.flutterapphelper.MyApp { *; }
-keep class com.zaitxcode.android.apps.flutterapphelper.MainActivity { *; }

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

# Flutter embedding.
-dontwarn io.flutter.**
