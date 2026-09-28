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
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
        }
        release {
            isMinifyEnabled = false
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
                groupId = "com.github.zaitxcode"
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
