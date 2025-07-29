"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { usePreferences } from "../context/PreferencesContext"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = usePreferences()

  return (
    <motion.button
      onClick={toggleTheme}
      className="btn-secondary"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 180 : 0 }} transition={{ duration: 0.3 }}>
        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  )
}
