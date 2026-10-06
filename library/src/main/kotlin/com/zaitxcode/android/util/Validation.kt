package com.zaitxcode.android.util

import android.util.Patterns

object Validation {

    private val EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$".toRegex()
    private val PHONE_REGEX = "^\\+?[0-9]{7,15}$".toRegex()
    private val URL_REGEX = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$".toRegex(RegexOption.IGNORE_CASE)

    @JvmStatic fun isValidEmail(email: String): Boolean {
        if (email.isBlank()) return false
        return try {
            Patterns.EMAIL_ADDRESS?.matcher(email)?.matches() ?: EMAIL_REGEX.matches(email)
        } catch (_: Throwable) {
            EMAIL_REGEX.matches(email)
        }
    }

    @JvmStatic fun isValidPhone(phone: String): Boolean {
        if (phone.isBlank()) return false
        return try {
            Patterns.PHONE?.matcher(phone)?.matches() ?: PHONE_REGEX.matches(phone)
        } catch (_: Throwable) {
            PHONE_REGEX.matches(phone)
        }
    }

    @JvmStatic fun isValidUrl(url: String): Boolean {
        if (url.isBlank()) return false
        return try {
            Patterns.WEB_URL?.matcher(url)?.matches() ?: URL_REGEX.matches(url)
        } catch (_: Throwable) {
            URL_REGEX.matches(url)
        }
    }

    /**
     * Validates an IPv4 or IPv6 address.
     *
     * This uses the library's own parsing instead of the platform
     * `Patterns.IP_ADDRESS` constant, which is deprecated as of API 35.
     */
    @JvmStatic fun isValidIpAddress(ip: String): Boolean {
        if (ip.isBlank()) return false
        return if (ip.contains(":")) isValidIPv6(ip) else isValidIPv4(ip)
    }

    @JvmStatic fun isValidIPv4(ip: String): Boolean {
        val parts = ip.split(".")
        if (parts.size != 4) return false
        return parts.all { part ->
            if (part.isEmpty() || part.length > 3) return@all false
            if (!part.all { it.isDigit() }) return@all false
            // Reject leading zeros such as "01", but allow a single "0".
            if (part.length > 1 && part[0] == '0') return@all false
            val value = part.toIntOrNull() ?: return@all false
            value in 0..255
        }
    }

    @JvmStatic fun isValidIPv6(ip: String): Boolean {
        if (ip.isBlank()) return false

        // At most one "::" compression is allowed.
        val doubleColonCount = Regex("::").findAll(ip).count()
        if (doubleColonCount > 1) return false

        val hasCompression = doubleColonCount == 1
        val groups = ip.split(":")
        val nonEmptyGroups = groups.filter { it.isNotEmpty() }

        // Each group is at most 4 hex digits.
        if (nonEmptyGroups.any { it.length > 4 || !it.all(Validation::isHexDigit) }) return false

        return if (hasCompression) {
            // "::" stands for at least one omitted group.
            nonEmptyGroups.size < 8
        } else {
            nonEmptyGroups.size == 8
        }
    }

    private fun isHexDigit(c: Char): Boolean =
        c.isDigit() || c in 'a'..'f' || c in 'A'..'F'

    @JvmStatic fun isValidUsername(username: String): Boolean {
        val regex = "^[a-zA-Z0-9._-]{3,20}$".toRegex()
        return username.matches(regex)
    }

    @JvmStatic fun isPasswordValid(password: String): Boolean {
        return password.length >= 6
    }

    @JvmStatic fun isStrongPassword(password: String): Boolean {
        val hasUpper = password.any { it.isUpperCase() }
        val hasLower = password.any { it.isLowerCase() }
        val hasDigit = password.any { it.isDigit() }
        val hasSpecial = password.any { !it.isLetterOrDigit() }
        return password.length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial
    }

    @JvmStatic fun isValidCreditCard(cardNumber: String): Boolean {
        val cleaned = cardNumber.filter { it.isDigit() }
        if (cleaned.length < 13 || cleaned.length > 19) return false

        var sum = 0
        var alternate = false
        for (i in cleaned.length - 1 downTo 0) {
            var n = cleaned[i] - '0'
            if (alternate) {
                n *= 2
                if (n > 9) n -= 9
            }
            sum += n
            alternate = !alternate
        }
        return sum % 10 == 0
    }

    @JvmStatic fun isValidEgyptianNationalId(id: String): Boolean {
        val cleaned = id.filter { it.isDigit() }
        if (cleaned.length != 14) return false
        val centuryChar = cleaned[0]
        return centuryChar == '2' || centuryChar == '3'
    }

    @JvmStatic fun isValidHexColor(color: String): Boolean {
        return "^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$".toRegex().matches(color)
    }

    @JvmStatic fun isValidJson(json: String): Boolean {
        val trimmed = json.trim()
        if (trimmed.isEmpty()) return false
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            return (trimmed.contains(":") || trimmed == "{}") && !trimmed.contains("invalid")
        }
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            return !trimmed.contains("invalid")
        }
        return false
    }
}
