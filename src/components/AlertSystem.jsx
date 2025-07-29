"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect } from "react"
import { usePreferences } from "../context/PreferencesContext"
import { formatGwei } from "../utils/formatters"

export const AlertSystem = ({ gasData }) => {
  const { gasThreshold, notifications } = usePreferences()
  const [alerts, setAlerts] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [lastAlertTime, setLastAlertTime] = useState(0)

  const playNotificationSound = () => {
    if (soundEnabled) {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  useEffect(() => {
    if (!gasData || !notifications) return

    const currentGas = Number.parseFloat(gasData.ProposeGasPrice)
    const now = Date.now()

    // Prevent spam alerts (minimum 5 minutes between alerts)
    if (currentGas <= gasThreshold && now - lastAlertTime > 300000) {
      const newAlert = {
        id: now,
        type: "threshold",
        title: "Gas Fee Alert! 🎉",
        message: `Gas fees dropped to ${formatGwei(currentGas)} Gwei (below your ${gasThreshold} Gwei threshold)`,
        timestamp: now,
        gasPrice: currentGas,
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]) // Keep only 5 most recent
      setLastAlertTime(now)
      playNotificationSound()

      // Browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("GasFlow - Gas Fee Alert", {
          body: newAlert.message,
          icon: "/pwa-192x192.png",
          badge: "/pwa-192x192.png",
        })
      }
    }
  }, [gasData, gasThreshold, notifications, lastAlertTime])

  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission()
    }
  }

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  if (!notifications || alerts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl shadow-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{alert.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={soundEnabled ? "Disable sound" : "Enable sound"}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-gray-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
