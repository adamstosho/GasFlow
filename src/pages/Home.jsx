"use client"

import { motion } from "framer-motion"
import { RefreshCw, Settings, Fuel, Clock, Zap, BarChart3, TrendingUp, Activity } from "lucide-react"
import { GasCard } from "../components/GasCard"
import { TrendChart } from "../components/TrendChart"
import { TipBox } from "../components/TipBox"
import { PreferencesModal } from "../components/PreferencesModal"
import { ThemeToggle } from "../components/ThemeToggle"
import { GasCalculator } from "../components/GasCalculator"
import { NetworkStatus } from "../components/NetworkStatus"
import { AlertSystem } from "../components/AlertSystem"
import { HistoricalData } from "../components/HistoricalData"
import { useGasData } from "../hooks/useGasData"
import { useState, useEffect } from "react"
import { formatTime } from "../utils/formatters"

export const Home = () => {
  const { gasData, chartData, loading, error, lastUpdated, refreshData } = useGasData()
  const [showPreferences, setShowPreferences] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Zap },
    { id: "calculator", label: "Calculator", icon: RefreshCw },
    { id: "history", label: "History", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-blue-50/30 to-indigo-50/30 dark:from-bg-dark dark:via-gray-900/50 dark:to-gray-800/50 transition-colors duration-300">
      {/* Alert System */}
      <AlertSystem gasData={gasData} />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <motion.div 
                className="flex items-center group cursor-pointer" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Fuel className="w-10 h-10 text-primary mr-4 animate-float" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">GasLite</h1>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Ethereum Gas Tracker</div>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center space-x-4">
              <NetworkStatus gasData={gasData} isOnline={isOnline} />

              {lastUpdated && (
                <div className="hidden sm:flex items-center text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 px-3 py-2 rounded-xl">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Updated {formatTime(lastUpdated)}</span>
                </div>
              )}

              <motion.button
                onClick={refreshData}
                disabled={loading}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Refresh gas data"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </motion.button>

              <motion.button
                onClick={() => setShowPreferences(true)}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open preferences"
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <ThemeToggle />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 pb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "tab-active"
                      : "tab-inactive"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
          {activeTab === "dashboard" && (
            <>
              {/* Hero Section */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Real-Time <span className="gradient-text">Gas Tracker</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Monitor Ethereum gas fees, get alerts, and make informed decisions for your transactions with live data updates every 15 seconds
                  </p>
                </div>
              </motion.div>

              {/* Gas Cards */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    <Activity className="w-6 h-6 mr-3 text-primary" />
                    Current Gas Prices
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <GasCard gasData={gasData} type="slow" />
                  <GasCard gasData={gasData} type="standard" />
                  <GasCard gasData={gasData} type="fast" />
                </div>
              </motion.div>

              {/* Chart and Tips */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-3 text-primary" />
                      Gas Price Trends
                    </h3>
                    <TrendChart data={chartData} />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TipBox />
                </motion.div>
              </div>
            </>
          )}

          {activeTab === "calculator" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <div className="glass-card p-6">
                  <GasCalculator gasData={gasData} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <TipBox />
              </motion.div>
            </div>
          )}

          {activeTab === "history" && (
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <HistoricalData />
              </div>
            </motion.div>
          )}

          {/* Footer Info */}
          <motion.div
            variants={itemVariants}
            className="text-center py-12 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Data updates every 15 seconds</span>
              <span>•</span>
              <span>Built for Web3 users</span>
              <span>•</span>
              <span className={`flex items-center space-x-2 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                <div className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}></div>
                <span>{isOnline ? "Online" : "Offline"}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Preferences Modal */}
      <PreferencesModal isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
    </div>
  )
}
