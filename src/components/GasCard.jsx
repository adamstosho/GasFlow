"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, Zap, Clock, DollarSign } from "lucide-react"
import { formatGwei, getGasLevel, getGasLevelColor, getGasLevelBg } from "../utils/formatters"
import { TRANSACTION_TYPES } from "../utils/constants"
import { gasApiService } from "../services/gasApi"
import { useState, useEffect } from "react"

export const GasCard = ({ gasData, type = "standard" }) => {
  const [ethPrice, setEthPrice] = useState(2000)

  useEffect(() => {
    const fetchEthPrice = async () => {
      const price = await gasApiService.getEthPrice()
      setEthPrice(price)
    }
    fetchEthPrice()
  }, [])

  if (!gasData) {
    return (
      <motion.div
        className="gas-card animate-pulse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </motion.div>
    )
  }

  const getGasPrice = () => {
    switch (type) {
      case "slow":
        return gasData.SafeGasPrice
      case "fast":
        return gasData.FastGasPrice
      default:
        return gasData.ProposeGasPrice
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case "slow":
        return "Slow"
      case "fast":
        return "Fast"
      default:
        return "Standard"
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case "slow":
        return <Clock className="w-4 h-4" />
      case "fast":
        return <Zap className="w-4 h-4" />
      default:
        return <TrendingUp className="w-4 h-4" />
    }
  }

  const gasPrice = Number.parseFloat(getGasPrice())
  const level = getGasLevel(gasPrice)
  const levelColor = getGasLevelColor(level)
  const levelBg = getGasLevelBg(level)

  // Calculate estimated cost for simple transfer
  const gasCostEth = (gasPrice * TRANSACTION_TYPES.SIMPLE_TRANSFER.gasLimit) / 1e9
  const gasCostUSD = gasCostEth * ethPrice

  const getTrendIcon = () => {
    if (gasPrice < 20) return <TrendingDown className="w-5 h-5 text-success" />
    if (gasPrice > 50) return <TrendingUp className="w-5 h-5 text-error" />
    return <Minus className="w-5 h-5 text-warning" />
  }

  return (
    <motion.div
      className={`gas-card ${levelBg} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-gray-700/5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${levelBg} ${levelColor}`}>
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{getTypeLabel()}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Priority</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
        </div>
      </div>

      {/* Gas Price Display */}
      <div className="mb-6 relative z-10">
        <div className="flex items-baseline space-x-2">
          <span className={`text-4xl font-bold ${levelColor}`}>{formatGwei(gasPrice)}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gwei</span>
        </div>
        <div className={`mt-2 w-16 h-1 rounded-full ${levelColor.replace('text-', 'bg-')}`}></div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Simple Transfer</span>
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">${gasCostUSD.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>ETH Cost:</span>
          <span className="font-mono">{gasCostEth.toFixed(6)} ETH</span>
        </div>
      </div>

      {/* Status Badge */}
      <motion.div
        className={`mt-4 px-3 py-2 rounded-xl text-xs font-semibold text-center ${levelColor} ${levelBg} border border-current/20`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {level.toLowerCase()} priority
      </motion.div>
    </motion.div>
  )
}
