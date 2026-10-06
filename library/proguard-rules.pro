# ============================================================
# AndroidHelper - Library R8 / ProGuard rules
# ------------------------------------------------------------
# Applied while building the library itself.
#
# Strategy: the PUBLIC API (class names + public members) is kept
# so Kotlin, Java and Flutter consumers keep compiling and running,
# while the private implementation is left free to be optimized,
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
