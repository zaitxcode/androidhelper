# ============================================================
# AndroidHelper - Library R8 / ProGuard rules
# ------------------------------------------------------------
# Reference rules for the library module.
#
# Obfuscation is DISABLED for the library (isMinifyEnabled = false),
# so these rules are not applied to the published AAR. They are kept
# as documentation of the public surface and as a ready-to-use
# starting point should minification ever be enabled.
#
# Strategy if enabled: keep the PUBLIC API (class names + public
# members) so Kotlin, Java and Flutter consumers keep compiling and
# running, while the private implementation is free to be optimized,
# shrunk and obfuscated.
# ============================================================

# Keep public API classes and their public members.
-keep class com.zaitxcode.android.** {
    public <methods>;
    public <fields>;
}

# Kotlin object singletons expose an INSTANCE field to Kotlin consumers.
-keepclassmembers class com.zaitxcode.android.** {
    public static final *** INSTANCE;
}

# Keep Kotlin metadata so reflection based interop keeps working.
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**

# AndroidX FileProvider declared in the merged manifest.
-keep class androidx.core.content.FileProvider { *; }
-keep class androidx.core.content.FileProvider$* { *; }
