# ============================================================
# AndroidHelper - Consumer ProGuard / R8 rules
# ------------------------------------------------------------
# This file is packaged inside the AAR and is applied
# automatically to every app that depends on the library.
#
# It guarantees that enabling minification / obfuscation in a
# consumer project never removes or renames the public API the
# consumer calls, so existing apps keep working after the library
# itself has been obfuscated.
# ============================================================

# Keep the public API surface of every helper.
-keep class com.zaitxcode.android.** {
    public <methods>;
    public <fields>;
}

# Keep the INSTANCE field of every Kotlin singleton object.
-keepclassmembers class com.zaitxcode.android.** {
    public static final *** INSTANCE;
}

# Keep Kotlin metadata required by reflection and interop.
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**

# AndroidX FileProvider used to share generated files.
-keep class androidx.core.content.FileProvider { *; }
-keep class androidx.core.content.FileProvider$* { *; }
