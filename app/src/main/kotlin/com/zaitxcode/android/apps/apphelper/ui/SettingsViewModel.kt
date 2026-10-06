package com.zaitxcode.android.apps.apphelper.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.zaitxcode.android.apps.apphelper.theme.AppSettings
import com.zaitxcode.android.apps.apphelper.theme.DarkMode
import com.zaitxcode.android.apps.apphelper.theme.ThemeManager
import com.zaitxcode.android.apps.apphelper.theme.ThemeMode
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class SettingsViewModel(application: Application) : AndroidViewModel(application) {

    private val manager = ThemeManager(application)

    val settings: StateFlow<AppSettings> = manager.settings.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = AppSettings()
    )

    fun setThemeMode(mode: ThemeMode) = viewModelScope.launch {
        manager.setThemeMode(mode)
    }

    fun setDarkMode(mode: DarkMode) = viewModelScope.launch {
        manager.setDarkMode(mode)
    }

    fun setGlassEffect(enabled: Boolean) = viewModelScope.launch {
        manager.setGlassEffect(enabled)
    }
}
