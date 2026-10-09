package com.zaitxcode.android.net

import android.annotation.SuppressLint
import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ProcessLifecycleOwner
import com.zaitxcode.android.core.AppHelper
import java.net.Inet4Address
import java.net.NetworkInterface

@SuppressLint("NewApi", "InlinedApi")
object Network : DefaultLifecycleObserver {

    private lateinit var connectivityManager: ConnectivityManager
    private lateinit var appContext: Context
    private val listeners = mutableListOf<(Boolean) -> Unit>()
    private var initialized = false
    private var registeredCallback = false
    private val callback by lazy {
        object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) {
                refreshConnectionState()
            }

            override fun onLost(network: Network) {
                refreshConnectionState()
            }
        }
    }
    private val request by lazy {
        NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()
    }

    @get:JvmStatic
    val isConnected: Boolean
        get() {
            AppHelper.checkInitialized()
            return hasValidatedInternet()
        }

    @JvmStatic
    fun initialize(context: Context) {
        if (initialized) return
        initialized = true
        appContext = context.applicationContext

        connectivityManager = appContext.getSystemService(Context.CONNECTIVITY_SERVICE)
            as? ConnectivityManager
            ?: return

        updateCurrentConnectionState()

        ProcessLifecycleOwner.get().lifecycle.addObserver(this)
        registerMonitorIfNeeded()
    }

    override fun onStart(owner: LifecycleOwner) {
        updateCurrentConnectionState()
        registerMonitorIfNeeded()
    }

    override fun onStop(owner: LifecycleOwner) {
        unregisterMonitor()
    }

    @JvmStatic
    fun addConnectionListener(listener: (Boolean) -> Unit) {
        AppHelper.checkInitialized()
        updateCurrentConnectionState()
        listeners.add(listener)
        listener(isConnected)
    }

    @JvmStatic
    fun removeConnectionListener(listener: (Boolean) -> Unit) {
        AppHelper.checkInitialized()
        listeners.remove(listener)
    }

    @JvmStatic
    fun hasValidatedInternet(): Boolean {
        AppHelper.checkInitialized()
        val capabilities = currentCapabilities() ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
            capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }

    @JvmStatic
    fun activeTransport(): String {
        AppHelper.checkInitialized()
        val capabilities = currentCapabilities() ?: return "NONE"
        return when {
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WIFI"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "CELLULAR"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ETHERNET"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN) -> "VPN"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_BLUETOOTH) -> "BLUETOOTH"
            else -> "UNKNOWN"
        }
    }

    @JvmStatic
    fun isWifiConnected(): Boolean {
        AppHelper.checkInitialized()
        return hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
    }

    @JvmStatic
    fun isCellularConnected(): Boolean {
        AppHelper.checkInitialized()
        return hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
    }

    @JvmStatic
    fun isEthernetConnected(): Boolean {
        AppHelper.checkInitialized()
        return hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)
    }

    @JvmStatic
    fun isVpnConnected(): Boolean {
        AppHelper.checkInitialized()
        return hasTransport(NetworkCapabilities.TRANSPORT_VPN)
    }

    @JvmStatic
    fun isConnectionMetered(): Boolean {
        AppHelper.checkInitialized()
        if (!initialized) return false
        return connectivityManager.isActiveNetworkMetered
    }

    @JvmStatic
    fun getIpAddress(): String? {
        AppHelper.checkInitialized()
        try {
            val interfaces = NetworkInterface.getNetworkInterfaces()
            while (interfaces.hasMoreElements()) {
                val networkInterface = interfaces.nextElement()
                val addresses = networkInterface.inetAddresses
                while (addresses.hasMoreElements()) {
                    val address = addresses.nextElement()
                    if (!address.isLoopbackAddress && address is Inet4Address) {
                        return address.hostAddress
                    }
                }
            }
        } catch (_: Exception) {
            // Guard
        }
        return null
    }

    private var _lastConnectionState = false

    private fun updateCurrentConnectionState() {
        _lastConnectionState = hasValidatedInternet()
    }

    private fun refreshConnectionState() {
        val previous = _lastConnectionState
        updateCurrentConnectionState()
        if (previous != _lastConnectionState) {
            notifyListeners(_lastConnectionState)
        }
    }

    private fun registerCallbackIfNeeded() {
        if (registeredCallback) return
        try {
            connectivityManager.registerNetworkCallback(request, callback)
            registeredCallback = true
        } catch (_: Exception) {
            // Guard
        }
    }

    private fun registerMonitorIfNeeded() {
        registerCallbackIfNeeded()
    }

    private fun unregisterMonitor() {
        if (!registeredCallback) return
        try {
            connectivityManager.unregisterNetworkCallback(callback)
            registeredCallback = false
        } catch (_: Exception) {
            // Guard
        }
    }

    private fun currentCapabilities(): NetworkCapabilities? {
        if (!initialized) return null
        val network = connectivityManager.activeNetwork ?: return null
        return connectivityManager.getNetworkCapabilities(network)
    }

    private fun hasTransport(transport: Int): Boolean {
        val capabilities = currentCapabilities() ?: return false
        return capabilities.hasTransport(transport)
    }

    private fun notifyListeners(state: Boolean) {
        listeners.toList().forEach { listener ->
            try {
                listener(state)
            } catch (_: Exception) {
                // Guard
            }
        }
    }
}
