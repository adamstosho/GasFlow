"use client"

import { motion } from "framer-motion"
import { Wifi, WifiOff, Activity, AlertTriangle, Database } from "lucide-react"
import { getGasLevel } from "../utils/formatters"
import { gasApiService } from "../services/gasApi"

export const NetworkStatus = ({ gasData, isOnline = true }) => {
  if (!gasData) {
    return (
      <motion.div
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-muted-dark">Connecting...</span>
        </div>
      </motion.div>
    )
  }

  const currentGas = Number.parseFloat(gasData.ProposeGasPrice)
  const level = getGasLevel(currentGas)
  const apiStatus = gasApiService.getApiStatus()

  const getStatusInfo = () => {
    // Check API status first
    if (apiStatus === "no-api-key") {
      return {
        icon: Database,
        label: "Demo Mode",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        description: "Using mock data",
      }
    }

    if (apiStatus === "mock-data") {
      return {
        icon: Database,
        label: "Mock Data",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        description: "API unavailable",
      }
    }

    if (!isOnline) {
      return {
        icon: WifiOff,
        label: "Offline",
        color: "text-gray-500 dark:text-gray-400",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        description: "No connection",
      }
    }

    // Live data with gas level
    switch (level) {
      case "LOW":
        return {
          icon: Activity,
          label: "Optimal",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/20",
          description: "Great time to transact",
        }
      case "MEDIUM":
        return {
          icon: Activity,
          label: "Moderate",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
          description: "Normal network activity",
        }
      case "HIGH":
        return {
          icon: AlertTriangle,
          label: "Congested",
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/20",
          description: "High network congestion",
        }
      default:
        return {
          icon: Wifi,
          label: "Unknown",
          color: "text-gray-500 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-800",
          description: "Status unknown",
        }
    }
  }

  const status = getStatusInfo()
  const Icon = status.icon

  return (
    <motion.div
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${status.bgColor}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          scale: isOnline && apiStatus === "live-data" ? [1, 1.2, 1] : 1,
          rotate: isOnline && apiStatus === "live-data" ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isOnline && apiStatus === "live-data" ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      >
        <Icon className={`w-4 h-4 ${status.color}`} />
      </motion.div>

      <div>
        <div className={`text-sm font-medium ${status.color}`}>{status.label}</div>
        <div className="text-xs text-muted-dark">{status.description}</div>
      </div>
    </motion.div>
  )
}
