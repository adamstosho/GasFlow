"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Settings, Bell, RefreshCw, DollarSign, Zap } from "lucide-react"
import { usePreferences } from "../context/PreferencesContext"
import { CURRENCIES } from "../utils/constants"

export const PreferencesModal = ({ isOpen, onClose }) => {
  const {
    currency,
    setCurrency,
    gasThreshold,
    setGasThreshold,
    notifications,
    setNotifications,
    autoRefresh,
    setAutoRefresh,
  } = usePreferences()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Settings className="w-6 h-6 text-primary mr-2" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Preferences</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close preferences"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Currency Selection */}
                  <div>
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Currency</label>
                    </div>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.name} ({curr.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gas Threshold */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gas Alert Threshold
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={gasThreshold}
                        onChange={(e) => setGasThreshold(Number.parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[60px]">
                        {gasThreshold} Gwei
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Get notified when gas fees drop below this threshold
                    </p>
                  </div>

                  {/* Notifications Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Notifications
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get alerts for gas price changes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Auto Refresh Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Refresh</label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Automatically update gas prices every 15 seconds
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoRefresh ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoRefresh ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={onClose} className="w-full btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
