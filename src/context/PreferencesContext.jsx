"use client"

import { createContext, useContext, useState, useEffect } from "react"
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
  const [theme, setTheme] = useLocalStorage("gasflow-theme", "light")
  const [currency, setCurrency] = useLocalStorage("gasflow-currency", "USD")
  const [gasThreshold, setGasThreshold] = useLocalStorage("gasflow-gas-threshold", 25)
  const [notifications, setNotifications] = useLocalStorage("gasflow-notifications", true)
  const [autoRefresh, setAutoRefresh] = useLocalStorage("gasflow-auto-refresh", true)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
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
