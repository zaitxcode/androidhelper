# ============================================================
# AndroidHelper - Consumer ProGuard / R8 rules
# ------------------------------------------------------------
# This file is packaged inside the AAR and is applied
# automatically to every app that depends on the library.
#
# The library itself is NOT obfuscated, so consumers can call
# every helper safely out of the box. These rules exist only to
# protect the public API if a consumer enables minification in
# their own project: they guarantee the API they call is never
# stripped or renamed.
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
