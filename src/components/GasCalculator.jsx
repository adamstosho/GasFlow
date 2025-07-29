"use client"

import { motion } from "framer-motion"
import { Calculator, Copy, Share2 } from "lucide-react"
import { useState, useEffect } from "react"
import { TRANSACTION_TYPES } from "../utils/constants"
import { formatUSD, calculateGasCost } from "../utils/formatters"
import { gasApiService } from "../services/gasApi"
import { usePreferences } from "../context/PreferencesContext"

export const GasCalculator = ({ gasData }) => {
  const [selectedType, setSelectedType] = useState("SIMPLE_TRANSFER")
  const [customGasLimit, setCustomGasLimit] = useState("")
  const [ethPrice, setEthPrice] = useState(2000)
  const [showResults, setShowResults] = useState(false)
  const { currency } = usePreferences()

  useEffect(() => {
    const fetchEthPrice = async () => {
      const price = await gasApiService.getEthPrice()
      setEthPrice(price)
    }
    fetchEthPrice()
  }, [])

  const getGasLimit = () => {
    if (customGasLimit) return Number.parseInt(customGasLimit)
    return TRANSACTION_TYPES[selectedType].gasLimit
  }

  const calculateCosts = () => {
    if (!gasData) return null

    const gasLimit = getGasLimit()
    const costs = {
      slow: calculateGasCost(Number.parseFloat(gasData.SafeGasPrice), gasLimit, ethPrice),
      standard: calculateGasCost(Number.parseFloat(gasData.ProposeGasPrice), gasLimit, ethPrice),
      fast: calculateGasCost(Number.parseFloat(gasData.FastGasPrice), gasLimit, ethPrice),
    }

    return costs
  }

  const costs = calculateCosts()

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const shareResults = () => {
    if (navigator.share && costs) {
      navigator.share({
        title: "Gas Fee Calculation - GasFlow",
        text: `Gas costs for ${TRANSACTION_TYPES[selectedType].label}: Slow: $${costs.slow.usd.toFixed(2)}, Standard: $${costs.standard.usd.toFixed(2)}, Fast: $${costs.fast.usd.toFixed(2)}`,
        url: window.location.href,
      })
    }
  }

  return (
    <motion.div
      className="gas-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-primary mr-3" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Gas Calculator</h3>
      </div>

      <div className="space-y-4">
        {/* Transaction Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(TRANSACTION_TYPES).map(([key, type]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedType(key)
                  setCustomGasLimit("")
                  setShowResults(true)
                }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedType === key
                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">{type.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{type.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Gas Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gas Limit (Optional)
          </label>
          <input
            type="number"
            value={customGasLimit}
            onChange={(e) => {
              setCustomGasLimit(e.target.value)
              setShowResults(true)
            }}
            placeholder={`Default: ${TRANSACTION_TYPES[selectedType].gasLimit.toLocaleString()}`}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Results */}
        {showResults && costs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Estimated Costs</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Slow: $${costs.slow.usd.toFixed(2)}, Standard: $${costs.standard.usd.toFixed(2)}, Fast: $${costs.fast.usd.toFixed(2)}`,
                    )
                  }
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Copy results"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={shareResults}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Share results"
                >
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {["slow", "standard", "fast"].map((speed) => (
              <div key={speed} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      speed === "slow" ? "bg-green-500" : speed === "standard" ? "bg-blue-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{speed}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 dark:text-gray-200">
                    {formatUSD(costs[speed].usd, currency)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{costs[speed].eth.toFixed(6)} ETH</div>
                </div>
              </div>
            ))}

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
              Gas Limit: {getGasLimit().toLocaleString()} • ETH Price: {formatUSD(ethPrice, currency)}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
