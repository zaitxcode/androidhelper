import com.android.build.api.dsl.LibraryExtension
import org.gradle.api.publish.PublishingExtension
import org.gradle.api.publish.maven.MavenPublication
import org.gradle.kotlin.dsl.configure
import org.gradle.kotlin.dsl.create

plugins {
    alias(libs.plugins.android.library)
    id("maven-publish")
}

configure<LibraryExtension> {
    namespace = "com.zaitxcode.androidhelper"

    compileSdk = libs.versions.compileSdk.get().toInt()
    buildToolsVersion = libs.versions.buildTools.get()

    defaultConfig {
        minSdk = libs.versions.minSdk.get().toInt()

        // Keep rules shipped inside the AAR. They are automatically applied to
        // every consumer app. Obfuscation is intentionally disabled for the
        // library itself, so these rules only document the public surface and
        // guarantee consumers can never lose the API they call.
        consumerProguardFiles("consumer-rules.pro")

        externalNativeBuild {
            cmake {
                cppFlags("-std=c++17")
            }
        }
        ndk {
            abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64")
        }
    }

    externalNativeBuild {
        cmake {
            path("src/main/cpp/CMakeLists.txt")
        }
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
        }
        release {
            // Obfuscation is intentionally disabled so every consumer can call
            // the library safely. The rules below are kept as reference and are
            // only applied if a consumer enables minification themselves.
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

afterEvaluate {
    configure<PublishingExtension> {
        publications {
            create<MavenPublication>("release") {
                groupId = "com.zaitxcode"
                artifactId = "androidhelper"
                version = libs.versions.versionName.get()
                from(components["release"])
            }
        }
    }
}

dependencies {
    api(libs.androidx.core.ktx)
    api(libs.androidx.appcompat)
    api(libs.material)
    api(libs.androidx.browser)
    api(libs.androidx.swiperefreshlayout)
    api(libs.androidx.biometric)
    api(libs.androidx.lifecycle.process)

    testImplementation("junit:junit:4.13.2")
    testImplementation("org.json:json:20231013")
}
