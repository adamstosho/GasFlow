"use client"

import { createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const PreferencesContext = createContext()

export const usePreferences = () => {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}

export const PreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("gaslite-theme", "light")
  const [currency, setCurrency] = useLocalStorage("gaslite-currency", "USD")
  const [gasThreshold, setGasThreshold] = useLocalStorage("gaslite-gas-threshold", 25)
  const [notifications, setNotifications] = useLocalStorage("gaslite-notifications", true)
  const [autoRefresh, setAutoRefresh] = useLocalStorage("gaslite-auto-refresh", true)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // Update document class for Tailwind dark mode
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize theme on mount
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    currency,
    setCurrency,
    gasThreshold,
    setGasThreshold,
    notifications,
    setNotifications,
    autoRefresh,
    setAutoRefresh,
  }

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
